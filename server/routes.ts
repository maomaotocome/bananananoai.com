import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import multer, { MulterError } from "multer";
import { generateImage, generateImageFromText } from "./gemini";
import { promptOptimizerService } from "./promptOptimizer";
import { generatePoseImage, enhancePrompt } from "./gemini";
import { generatePoseFusion, generatePoseFusionEdit } from "./poseGenerator";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // SEO routes - sitemap and robots.txt
  app.get("/sitemap.xml", (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.sendFile('sitemap.xml', { root: './client/public' });
  });

  app.get("/robots.txt", (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.sendFile('robots.txt', { root: './client/public' });
  });

  // Favicon handling - solve Soft 404 issue with proper ICO format
  app.get("/favicon.ico", (req, res) => {
    // Set appropriate headers for favicon
    res.set({
      'Content-Type': 'image/x-icon',
      'Cache-Control': 'public, max-age=31536000' // 1 year cache
    });
    
    // Generate a proper 16x16 ICO file with banana emoji-like pattern
    // ICO header: ICONDIR structure
    const icoHeader = Buffer.from([
      0x00, 0x00, // Reserved, must be 0
      0x01, 0x00, // Type: 1 = ICO
      0x01, 0x00, // Number of images: 1
    ]);
    
    // ICO directory entry: ICONDIRENTRY structure  
    const icoEntry = Buffer.from([
      0x10,       // Width: 16 pixels
      0x10,       // Height: 16 pixels
      0x00,       // Color count: 0 (256+ colors)
      0x00,       // Reserved: 0
      0x01, 0x00, // Color planes: 1
      0x20, 0x00, // Bits per pixel: 32
      0x00, 0x04, 0x00, 0x00, // Size of image data: 1024 bytes
      0x16, 0x00, 0x00, 0x00  // Offset to image data: 22 bytes
    ]);
    
    // BMP header for the icon image
    const bmpHeader = Buffer.from([
      0x28, 0x00, 0x00, 0x00, // Header size: 40 bytes
      0x10, 0x00, 0x00, 0x00, // Width: 16 pixels
      0x20, 0x00, 0x00, 0x00, // Height: 32 pixels (16*2 for AND mask)
      0x01, 0x00,             // Color planes: 1
      0x20, 0x00,             // Bits per pixel: 32
      0x00, 0x00, 0x00, 0x00, // Compression: none
      0x00, 0x04, 0x00, 0x00, // Image size: 1024 bytes
      0x00, 0x00, 0x00, 0x00, // X pixels per meter
      0x00, 0x00, 0x00, 0x00, // Y pixels per meter
      0x00, 0x00, 0x00, 0x00, // Colors used
      0x00, 0x00, 0x00, 0x00  // Important colors
    ]);
    
    // Create yellow/golden color pattern for banana theme
    const yellow = Buffer.from([0x00, 0xD4, 0xFF, 0xFF]); // BGRA format
    const darkYellow = Buffer.from([0x00, 0x8B, 0xFF, 0xFF]);
    const transparent = Buffer.from([0x00, 0x00, 0x00, 0x00]);
    
    // Create 16x16 pixel data (bottom-up bitmap)
    const pixelData = Buffer.alloc(16 * 16 * 4); // 1024 bytes
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const pos = (y * 16 + x) * 4;
        // Simple banana-like pattern
        if (x >= 4 && x <= 11 && y >= 3 && y <= 12) {
          if (x === 4 || x === 11 || y === 3 || y === 12) {
            darkYellow.copy(pixelData, pos);
          } else {
            yellow.copy(pixelData, pos);
          }
        } else {
          transparent.copy(pixelData, pos);
        }
      }
    }
    
    // AND mask (all zeros for 32-bit icons)
    const andMask = Buffer.alloc(16 * 16 / 8); // 32 bytes
    
    const icoFile = Buffer.concat([icoHeader, icoEntry, bmpHeader, pixelData, andMask]);
    res.end(icoFile);
  });

  // Test endpoint to verify Gemini API connectivity
  app.post("/api/test-gemini", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          success: false,
          error: "GEMINI_API_KEY not configured"
        });
      }

      // Simple text test
      const { GoogleGenAI } = require("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Say 'API is working!' in a few words"
      });

      res.json({
        success: true,
        message: "Gemini API is connected",
        response: response.text || "Connected successfully"
      });
    } catch (error) {
      console.error("Gemini API test error:", error);
      res.status(500).json({
        success: false,
        error: `API test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  });

  // Image editing endpoint with file upload
  app.post("/api/generate-image", upload.single('image'), async (req, res) => {
    try {
      const { prompt } = req.body;
      const imageFile = (req as any).file as Express.Multer.File;

      // Validation
      if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: "Prompt is required and must be a non-empty string"
        });
      }

      if (!imageFile) {
        return res.status(400).json({
          success: false,
          error: "Image file is required"
        });
      }

      // Check if API key is available
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          success: false,
          error: "Gemini API key not configured. Please set GEMINI_API_KEY environment variable."
        });
      }

      // Generate image using Gemini API
      const result = await generateImage(imageFile.buffer, imageFile.mimetype, prompt.trim());

      if (result.success && result.imageData) {
        // Convert buffer to base64 data URL for frontend
        const base64Image = `data:image/png;base64,${result.imageData.toString('base64')}`;
        
        res.json({
          success: true,
          imageUrl: base64Image,
          prompt: prompt.trim()
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error || "Failed to generate image"
        });
      }

    } catch (error) {
      console.error("Image generation error:", error);
      
      if (error instanceof MulterError) {
        return res.status(400).json({
          success: false,
          error: error.code === 'LIMIT_FILE_SIZE' 
            ? "File too large. Maximum size is 10MB." 
            : `File upload error: ${error.message}`
        });
      }

      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error) || "Internal server error"
      });
    }
  });

  // Text-to-image generation endpoint
  app.post("/api/generate-image-text", async (req, res) => {
    try {
      const { prompt } = req.body;

      // Validation
      if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: "Prompt is required and must be a non-empty string"
        });
      }

      // Check if API key is available
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          success: false,
          error: "Gemini API key not configured. Please set GEMINI_API_KEY environment variable."
        });
      }

      // Generate image using Gemini API
      const result = await generateImageFromText(prompt.trim());

      if (result.success && result.imageData) {
        // Convert buffer to base64 data URL for frontend
        const base64Image = `data:image/png;base64,${result.imageData.toString('base64')}`;
        
        res.json({
          success: true,
          imageUrl: base64Image,
          prompt: prompt.trim()
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error || "Failed to generate image"
        });
      }

    } catch (error) {
      console.error("Text-to-image generation error:", error);
      
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error) || "Internal server error"
      });
    }
  });

  // Pose Painter specific endpoint
  app.post("/api/generate-pose-image", async (req, res) => {
    try {
      const { referenceImages, poseSketch, sceneDescription, aspectRatio } = req.body;

      if (!referenceImages || !Array.isArray(referenceImages) || referenceImages.length === 0) {
        return res.status(400).json({ error: "At least one reference image is required" });
      }

      if (!poseSketch) {
        return res.status(400).json({ error: "Pose sketch is required" });
      }

      if (!sceneDescription || !sceneDescription.trim()) {
        return res.status(400).json({ error: "Scene description is required" });
      }

      // Use the new pose fusion generator for better character consistency
      const result = await generatePoseFusion(
        referenceImages,
        poseSketch,
        sceneDescription,
        aspectRatio
      );
      
      if (result.success && result.imageData) {
        // Convert buffer to base64 data URL for frontend
        const base64Image = `data:image/png;base64,${result.imageData.toString('base64')}`;
        
        res.json({
          success: true,
          imageUrl: base64Image,
          message: "Character fusion image generated successfully"
        });
      } else {
        // Fallback to edit approach if fusion fails
        if (referenceImages.length === 1) {
          const editResult = await generatePoseFusionEdit(
            referenceImages[0],
            poseSketch,
            sceneDescription
          );
          
          if (editResult.success && editResult.imageData) {
            const base64Image = `data:image/png;base64,${editResult.imageData.toString('base64')}`;
            
            res.json({
              success: true,
              imageUrl: base64Image,
              message: "角色融合图像生成成功"
            });
            return;
          }
        }
        
        res.status(500).json({
          success: false,
          error: result.error || "Image generation failed, please try again"
        });
      }

    } catch (error) {
      console.error("Pose generation error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Image generation failed, please try again" 
      });
    }
  });

  // Prompt optimization endpoints
  app.post("/api/optimize-prompt", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const optimization = await promptOptimizerService.optimizePrompt(prompt);
      res.json(optimization);
    } catch (error) {
      console.error("Error optimizing prompt:", error);
      res.status(500).json({ error: "Failed to optimize prompt" });
    }
  });

  app.get("/api/trending-patterns", (req, res) => {
    try {
      const patterns = promptOptimizerService.getTrendingPatterns();
      res.json(patterns);
    } catch (error) {
      console.error("Error fetching trending patterns:", error);
      res.status(500).json({ error: "Failed to fetch trending patterns" });
    }
  });

  app.post("/api/generate-suggestions", async (req, res) => {
    try {
      const { basePrompt, count = 3 } = req.body;
      if (!basePrompt) {
        return res.status(400).json({ error: "Base prompt is required" });
      }

      const suggestions = await promptOptimizerService.generateSmartSuggestions(basePrompt, count);
      res.json({ suggestions });
    } catch (error) {
      console.error("Error generating suggestions:", error);
      res.status(500).json({ error: "Failed to generate suggestions" });
    }
  });

  app.post("/api/record-success", (req, res) => {
    try {
      const { prompt, metrics } = req.body;
      if (!prompt || !metrics) {
        return res.status(400).json({ error: "Prompt and metrics are required" });
      }

      promptOptimizerService.recordSuccessfulGeneration(prompt, metrics);
      res.json({ success: true });
    } catch (error) {
      console.error("Error recording success:", error);
      res.status(500).json({ error: "Failed to record success" });
    }
  });

  // Pose Painter API endpoint
  app.post("/api/generate-pose-image", async (req, res) => {
    try {
      const { referenceImages, poseSketch, sceneDescription, aspectRatio } = req.body;

      // Validate required fields
      if (!referenceImages || !Array.isArray(referenceImages) || referenceImages.length === 0) {
        return res.status(400).json({ error: "At least one reference image is required" });
      }

      if (!poseSketch) {
        return res.status(400).json({ error: "Pose sketch is required" });
      }

      if (!sceneDescription || !sceneDescription.trim()) {
        return res.status(400).json({ error: "Scene description is required" });
      }

      // Generate the pose image
      const result = await generatePoseImage({
        referenceImages,
        poseSketch,
        sceneDescription: sceneDescription.trim(),
        aspectRatio: aspectRatio || "1:1"
      });

      if (!result.success) {
        return res.status(500).json({ error: result.error });
      }

      // Convert image buffer to base64 for frontend display
      if (result.imageData) {
        const base64Image = `data:image/png;base64,${result.imageData.toString('base64')}`;
        res.json({ 
          success: true, 
          imageUrl: base64Image,
          message: "Image generated successfully"
        });
      } else {
        res.status(500).json({ error: "No image data received" });
      }

    } catch (error) {
      console.error("Error in pose generation endpoint:", error);
      res.status(500).json({ 
        error: "Internal server error during image generation",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Enhance prompt endpoint for pose painter
  app.post("/api/enhance-pose-prompt", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt || !prompt.trim()) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const enhancedPrompt = await enhancePrompt(prompt.trim());
      res.json({ 
        success: true, 
        enhancedPrompt,
        originalPrompt: prompt
      });

    } catch (error) {
      console.error("Error enhancing prompt:", error);
      res.status(500).json({ 
        error: "Failed to enhance prompt",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      geminiConfigured: !!process.env.GEMINI_API_KEY
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
