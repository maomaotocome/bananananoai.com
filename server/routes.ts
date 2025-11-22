import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import multer, { MulterError } from "multer";
import { generateImage, generateImageFromText } from "./gemini";
import { promptOptimizerService } from "./promptOptimizer";
import { generatePoseImage, enhancePrompt } from "./gemini";
import { generatePoseFusion, generatePoseFusionEdit } from "./poseGenerator";
import { storage } from "./storage";
import { createGenerationTask, getTaskStatus, processOutboxCommands } from "./kie-service";
import { insertGeneratedResultSchema } from "@shared/schema";
import { z } from "zod";

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

  // Nano Banana 3D Figurines API endpoints

  // Get all prompt packs
  app.get("/api/prompt-packs", async (req, res) => {
    try {
      const packs = await storage.getActivePromptPacks();
      res.json(packs);
    } catch (error) {
      console.error("Error fetching prompt packs:", error);
      res.status(500).json({ error: "Failed to fetch prompt packs" });
    }
  });

  // Generate figurine
  app.post("/api/generate-figurine", upload.single('image'), async (req, res) => {
    try {
      const { promptId, customPrompt } = req.body;
      const imageFile = (req as any).file as Express.Multer.File;

      if (!imageFile) {
        return res.status(400).json({
          success: false,
          error: "Image file is required"
        });
      }

      if (!promptId && !customPrompt) {
        return res.status(400).json({
          success: false,
          error: "Either promptId or customPrompt is required"
        });
      }

      // Check if API key is available
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          success: false,
          error: "Gemini API key not configured. Please set GEMINI_API_KEY environment variable."
        });
      }

      // Get prompt template if promptId is provided
      let finalPrompt = customPrompt;
      if (promptId && !customPrompt) {
        const promptPack = await storage.getPromptPack(promptId);
        if (!promptPack) {
          return res.status(404).json({
            success: false,
            error: "Prompt pack not found"
          });
        }
        finalPrompt = promptPack.prompt;
      }

      // Create figurine record
      const figurine = await storage.createFigurine({
        originalImageUrl: "temp", // We'll store this properly in production
        promptId: promptId || null,
        customPrompt: customPrompt || null,
        status: "generating"
      });

      // Generate image using Gemini API with Nano Banana model
      const result = await generateImage(imageFile.buffer, imageFile.mimetype, finalPrompt);

      if (result.success && result.imageData) {
        // Convert buffer to base64 data URL for frontend
        const base64Image = `data:image/png;base64,${result.imageData.toString('base64')}`;
        
        // Update figurine with generated image
        const updatedFigurine = await storage.updateFigurine(figurine.id, { 
          generatedImageUrl: base64Image,
          status: "completed"
        });

        res.json(updatedFigurine);
      } else {
        // Update status to failed
        await storage.updateFigurine(figurine.id, { status: "failed" });

        res.status(500).json({
          success: false,
          error: result.error || "Failed to generate figurine"
        });
      }

    } catch (error) {
      console.error("Figurine generation error:", error);
      
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

  // Get figurines (optional - for history)
  app.get("/api/figurines", async (req, res) => {
    try {
      const userFigurines = await storage.getAllFigurines();
      res.json(userFigurines);
    } catch (error) {
      console.error("Error fetching figurines:", error);
      res.status(500).json({ error: "Failed to fetch figurines" });
    }
  });

  // 3D Conversion endpoints
  app.post('/api/figurines/:id/make-3d', async (req, res) => {
    try {
      const { id } = req.params;
      
      // Get the figurine
      const figurine = await storage.getFigurine(id);
      if (!figurine) {
        return res.status(404).json({ error: 'Figurine not found' });
      }

      if (figurine.status !== 'completed') {
        return res.status(400).json({ error: 'Figurine must be completed before 3D conversion' });
      }

      // Create 3D model record
      const threeDModel = await storage.createThreeDModel({
        figurineId: id,
        status: 'processing'
      });

      // Simulate 3D conversion process
      // In real implementation, this would call TripoSR or Meshy API
      setTimeout(async () => {
        try {
          await storage.updateThreeDModel(threeDModel.id, {
            status: 'completed',
            stlUrl: `https://example.com/models/${threeDModel.id}.stl`
          });
        } catch (error) {
          console.error('3D model update error:', error);
        }
      }, 3000); // 3 second delay to simulate processing

      res.json(threeDModel);
    } catch (error) {
      console.error('3D conversion error:', error);
      res.status(500).json({ error: 'Failed to start 3D conversion' });
    }
  });

  app.get('/api/figurines/:id/3d-models', async (req, res) => {
    try {
      const { id } = req.params;
      const models = await storage.getThreeDModelsByFigurine(id);
      res.json(models);
    } catch (error) {
      console.error('Get 3D models error:', error);
      res.status(500).json({ error: 'Failed to get 3D models' });
    }
  });

  app.get('/api/3d-models/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const model = await storage.getThreeDModel(id);
      
      if (!model) {
        return res.status(404).json({ error: '3D model not found' });
      }
      
      res.json(model);
    } catch (error) {
      console.error('Get 3D model error:', error);
      res.status(500).json({ error: 'Failed to get 3D model' });
    }
  });

  // Print Quote endpoints
  app.post('/api/3d-models/:id/print-quote', async (req, res) => {
    try {
      const { id } = req.params;
      const { material = 'pla', quality = 'standard', quantity = 1 } = req.body;

      // Get the 3D model
      const model = await storage.getThreeDModel(id);
      if (!model) {
        return res.status(404).json({ error: '3D model not found' });
      }

      if (model.status !== 'completed') {
        return res.status(400).json({ error: '3D model must be completed before printing' });
      }

      // Create print job record
      const printJob = await storage.createPrintJob({
        modelId: id,
        material,
        quantity,
        status: 'quoted'
      });

      // Simulate quote calculation
      // In real implementation, this would call Craftcloud/Shapeways API
      const basePrice = 15.99;
      const materialMultiplier = material === 'resin' ? 2.5 : material === 'metal' ? 5.0 : 1.0;
      const qualityMultiplier = quality === 'high' ? 1.8 : quality === 'ultra' ? 3.0 : 1.0;
      const estimatedPrice = basePrice * materialMultiplier * qualityMultiplier * quantity;

      const updatedPrintJob = await storage.updatePrintJob(printJob.id, {
        quotedPrice: estimatedPrice.toFixed(2)
      });

      res.json(updatedPrintJob);
    } catch (error) {
      console.error('Print quote error:', error);
      res.status(500).json({ error: 'Failed to get print quote' });
    }
  });

  app.post('/api/print-jobs/:id/order', async (req, res) => {
    try {
      const { id } = req.params;
      const { shippingAddress, paymentMethod } = req.body;

      // Get the print job
      const printJob = await storage.getPrintJob(id);
      if (!printJob) {
        return res.status(404).json({ error: 'Print job not found' });
      }

      if (printJob.status !== 'quoted') {
        return res.status(400).json({ error: 'Print job must be quoted before ordering' });
      }

      // Update print job to ordered status
      const updatedPrintJob = await storage.updatePrintJob(id, {
        status: 'ordered',
        customerEmail: req.body.email || null,
        shippingInfo: { shippingAddress, paymentMethod, orderDate: new Date().toISOString() }
      });

      res.json({
        success: true,
        printJob: updatedPrintJob,
        message: 'Order placed successfully! You will receive tracking information via email.'
      });
    } catch (error) {
      console.error('Order creation error:', error);
      res.status(500).json({ error: 'Failed to place order' });
    }
  });

  app.get('/api/print-jobs/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const printJob = await storage.getPrintJob(id);
      
      if (!printJob) {
        return res.status(404).json({ error: 'Print job not found' });
      }
      
      res.json(printJob);
    } catch (error) {
      console.error('Get print job error:', error);
      res.status(500).json({ error: 'Failed to get print job' });
    }
  });

  // Kie.ai Nano Banana Pro API endpoints - Using Transactional Outbox Pattern
  
  // Create generation task (async workflow) - REQUIRES LOGIN & CREDITS
  app.post("/api/kie/generate", async (req, res) => {
    try {
      // 1. CHECK AUTHENTICATION - Must be logged in
      const user = req.user as any;
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Authentication required. Please register/login to generate images.",
          code: "AUTH_REQUIRED"
        });
      }

      const userId = user.id;
      const { prompt, imageInput, aspectRatio, resolution, outputFormat } = req.body;

      // 2. VALIDATE INPUT
      if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: "Prompt is required and must be a non-empty string"
        });
      }

      if (!process.env.KIE_API_KEY) {
        return res.status(500).json({
          success: false,
          error: "Kie.ai API key not configured"
        });
      }

      // 3. ENQUEUE GENERATION (Atomic: deduct credits + enqueue outbox command)
      const CREDIT_COST = 24; // $0.12 per image
      const result = await storage.enqueueKieGeneration(
        userId,
        CREDIT_COST,
        {
          prompt: prompt.trim(),
          imageInput: imageInput || [],
          aspectRatio: aspectRatio || "1:1",
          resolution: resolution || "1K",
          outputFormat: outputFormat || "png",
        },
        { resolution: resolution || "1K", aspectRatio: aspectRatio || "1:1", promptLength: prompt.length }
      );

      if (!result.success) {
        // Insufficient credits (atomic guard prevented deduction)
        return res.status(403).json({
          success: false,
          error: result.error === "INSUFFICIENT_CREDITS" 
            ? `Insufficient credits. You have ${result.remaining} credits, but need ${CREDIT_COST} credits to generate an image.`
            : "Failed to enqueue generation task",
          code: result.error || "UNKNOWN_ERROR",
          credits: result.remaining,
          required: CREDIT_COST
        });
      }

      console.log(`✅ Enqueued generation | Outbox: ${result.outboxId} | Ledger: ${result.ledgerId} | User: ${userId} | Credits: ${result.remaining}`);

      // 4. PROCESS OUTBOX IMMEDIATELY (sync for MVP - could be background worker later)
      // This calls Kie API and completes/refunds transaction
      const processing = await processOutboxCommands(1);

      // 5. RETURN RESPONSE BASED ON ACTUAL PROCESSING OUTCOME
      if (processing.succeeded > 0) {
        // Task created successfully on first attempt
        res.json({
          success: true,
          outboxId: result.outboxId,
          ledgerId: result.ledgerId,
          creditsUsed: CREDIT_COST,
          creditsRemaining: result.remaining,
          state: "succeeded", // Task created
          message: "Image generation started successfully"
        });
      } else if (processing.refunded > 0) {
        // Failed after max retries, credits refunded
        return res.status(500).json({
          success: false,
          error: "Image generation failed after multiple retries. Credits have been refunded.",
          code: "GENERATION_FAILED_REFUNDED",
          outboxId: result.outboxId,
          ledgerId: result.ledgerId,
          credits: result.remaining + CREDIT_COST, // Show post-refund balance
          refunded: true
        });
      } else if (processing.pending > 0) {
        // First attempt failed, will retry automatically
        res.json({
          success: true,
          outboxId: result.outboxId,
          ledgerId: result.ledgerId,
          creditsUsed: CREDIT_COST,
          creditsRemaining: result.remaining,
          state: "pending", // Will retry
          message: "Generation request queued. The system will retry automatically.",
          retrying: true
        });
      } else {
        // No processing happened (should not reach here)
        res.json({
          success: true,
          outboxId: result.outboxId,
          ledgerId: result.ledgerId,
          creditsUsed: CREDIT_COST,
          creditsRemaining: result.remaining,
          state: "pending"
        });
      }
    } catch (error) {
      console.error("Kie.ai generation error:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to create generation task"
      });
    }
  });

  // Poll task status
  app.get("/api/kie/task/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;

      // Get task from database
      const dbTask = await storage.getGenerationTaskByTaskId(taskId);
      if (!dbTask) {
        return res.status(404).json({
          success: false,
          error: "Task not found"
        });
      }

      // If task is already completed/failed, return cached result
      if (dbTask.state === "success" || dbTask.state === "fail") {
        return res.json({
          success: true,
          task: dbTask
        });
      }

      // Poll Kie.ai API for latest status
      const status = await getTaskStatus(taskId);

      // Update database with latest status
      const updatedTask = await storage.updateGenerationTask(dbTask.id, {
        state: status.state,
        resultUrls: status.resultUrls ? status.resultUrls as any : null,
        failCode: status.failCode || null,
        failMsg: status.failMsg || null,
        costTime: status.costTime || null,
        completeTime: status.completeTime ? new Date(status.completeTime) : null,
      });

      res.json({
        success: true,
        task: updatedTask
      });
    } catch (error) {
      console.error("Task status error:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to get task status"
      });
    }
  });

  // Get all generation tasks (for history/gallery)
  app.get("/api/kie/tasks", async (req, res) => {
    try {
      const tasks = await storage.getAllGenerationTasks();
      res.json({
        success: true,
        tasks
      });
    } catch (error) {
      console.error("Get tasks error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get tasks"
      });
    }
  });

  // ===== Generated Results API (UGC Gallery) =====
  
  // Get all public results (for gallery with pagination)
  app.get("/api/results", async (req, res) => {
    try {
      // Sanitize pagination parameters: non-negative integers with sensible bounds
      const rawLimit = parseInt(req.query.limit as string);
      const rawOffset = parseInt(req.query.offset as string);
      const limit = Math.min(Math.max(rawLimit > 0 ? rawLimit : 50, 1), 100); // 1-100
      const offset = Math.max(rawOffset >= 0 ? rawOffset : 0, 0); // >= 0
      
      // Pass offset to storage layer for proper SQL-based pagination
      const results = await storage.getPublicGeneratedResults(limit, offset);
      
      res.json({
        success: true,
        results,
        pagination: {
          limit,
          offset,
          returned: results.length,
          hasMore: results.length === limit // If we got full limit, there might be more
        }
      });
    } catch (error) {
      console.error("Get results error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get results"
      });
    }
  });

  // Get featured results (for homepage gallery)
  app.get("/api/results/featured", async (req, res) => {
    try {
      const rawLimit = parseInt(req.query.limit as string);
      const rawOffset = parseInt(req.query.offset as string);
      const limit = Math.min(Math.max(rawLimit > 0 ? rawLimit : 12, 1), 100); // 1-100
      const offset = Math.max(rawOffset >= 0 ? rawOffset : 0, 0); // >= 0
      const results = await storage.getFeaturedGeneratedResults(limit, offset);
      res.json({
        success: true,
        results,
        pagination: {
          limit,
          offset,
          returned: results.length,
          hasMore: results.length === limit
        }
      });
    } catch (error) {
      console.error("Get featured results error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get featured results"
      });
    }
  });

  // Get results by category
  app.get("/api/results/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const rawLimit = parseInt(req.query.limit as string);
      const rawOffset = parseInt(req.query.offset as string);
      const limit = Math.min(Math.max(rawLimit > 0 ? rawLimit : 20, 1), 100); // 1-100
      const offset = Math.max(rawOffset >= 0 ? rawOffset : 0, 0); // >= 0
      const results = await storage.getGeneratedResultsByCategory(category, limit, offset);
      res.json({
        success: true,
        results,
        pagination: {
          limit,
          offset,
          returned: results.length,
          hasMore: results.length === limit
        }
      });
    } catch (error) {
      console.error("Get results by category error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get results by category"
      });
    }
  });

  // Create a new generated result
  app.post("/api/results", async (req, res) => {
    try {
      // Validate request body with Zod schema
      const validated = insertGeneratedResultSchema.parse(req.body);
      
      // Calculate deterministic quality score (0-100)
      // Weights: prompt quality (40%) + metadata (30%) + engagement potential (30%)
      const promptScore = Math.min(40, Math.floor(
        (validated.prompt.length > 100 ? 40 : validated.prompt.length * 0.4) +
        (validated.title ? 5 : 0)
      ));
      
      const metadataScore = Math.min(30, Math.floor(
        (validated.metadata && typeof validated.metadata === 'object' && 'resolution' in validated.metadata
          ? (validated.metadata.resolution === "4K" ? 30 : 20)
          : 15) +
        (validated.tags && Array.isArray(validated.tags) && validated.tags.length > 0 ? 5 : 0)
      ));
      
      // Initial engagement score (will increase with actual likes/views)
      const engagementScore = Math.min(30, Math.floor(
        (validated.likes || 0) * 0.5 +
        (validated.views || 0) * 0.01 +
        (validated.shares || 0) * 1.5
      ));
      
      const qualityScore = Math.min(100, promptScore + metadataScore + engagementScore);

      const result = await storage.createGeneratedResult({
        ...validated,
        qualityScore,
        isFeatured: false // Admin sets this later
      });

      res.json({
        success: true,
        result
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: error.errors
        });
      }
      console.error("Create result error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to create result"
      });
    }
  });

  // Increment result views (for analytics)
  app.post("/api/results/:id/view", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.incrementResultViews(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Increment views error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to increment views"
      });
    }
  });

  // Like a result
  app.post("/api/results/:id/like", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.incrementResultLikes(id);
      const result = await storage.getGeneratedResult(id);
      res.json({
        success: true,
        likes: result?.likes || 0
      });
    } catch (error) {
      console.error("Like result error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to like result"
      });
    }
  });

  // Share a result (increment share count)
  app.post("/api/results/:id/share", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.incrementResultShares(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Share result error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to record share"
      });
    }
  });

  // Update result (for admin features like setting featured)
  app.patch("/api/results/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate partial update with Zod
      const updateSchema = insertGeneratedResultSchema.partial();
      const validated = updateSchema.parse(req.body);
      
      // Recalculate quality score if relevant fields changed
      if (validated.likes !== undefined || validated.views !== undefined || validated.shares !== undefined) {
        const currentResult = await storage.getGeneratedResult(id);
        if (currentResult) {
          const promptScore = Math.min(40, Math.floor(
            (currentResult.prompt.length > 100 ? 40 : currentResult.prompt.length * 0.4) +
            (currentResult.title ? 5 : 0)
          ));
          
          const metadataScore = Math.min(30, Math.floor(
            (currentResult.metadata && typeof currentResult.metadata === 'object' && 'resolution' in currentResult.metadata
              ? (currentResult.metadata.resolution === "4K" ? 30 : 20)
              : 15) +
            (currentResult.tags && Array.isArray(currentResult.tags) && currentResult.tags.length > 0 ? 5 : 0)
          ));
          
          const engagementScore = Math.min(30, Math.floor(
            (validated.likes ?? currentResult.likes) * 0.5 +
            (validated.views ?? currentResult.views) * 0.01 +
            (validated.shares ?? currentResult.shares) * 1.5
          ));
          
          validated.qualityScore = Math.min(100, promptScore + metadataScore + engagementScore);
        }
      }
      
      const result = await storage.updateGeneratedResult(id, validated);
      res.json({
        success: true,
        result
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: error.errors
        });
      }
      console.error("Update result error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to update result"
      });
    }
  });

  // ===== Credit System API =====
  
  // Get current user's credit balance
  app.get("/api/credits", async (req, res) => {
    try {
      const user = req.user as any;
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Authentication required"
        });
      }

      const userId = user.id;
      const credits = await storage.getUserCredits(userId);
      
      res.json({
        success: true,
        credits,
        imagesRemaining: Math.floor(credits / 24) // 24 credits per image
      });
    } catch (error) {
      console.error("Get credits error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get credits"
      });
    }
  });

  // Get current user's usage history
  app.get("/api/credits/history", async (req, res) => {
    try {
      const user = req.user as any;
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Authentication required"
        });
      }

      const userId = user.id;
      const limit = parseInt(req.query.limit as string) || 50;
      const history = await storage.getUserUsageHistory(userId, limit);
      
      res.json({
        success: true,
        history
      });
    } catch (error) {
      console.error("Get usage history error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get usage history"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      kieConfigured: !!process.env.KIE_API_KEY
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
