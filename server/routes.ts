import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import multer, { MulterError } from "multer";
import { generateImage, generateImageFromText } from "./gemini";
import { promptOptimizerService } from "./promptOptimizer";

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
