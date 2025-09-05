import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Function specifically for pose-based character fusion
export async function generatePoseFusion(
  referenceImages: string[],
  poseSketch: string,
  sceneDescription: string,
  aspectRatio: string
): Promise<{ success: boolean; imageData?: Buffer; error?: string }> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    // Prepare image inputs for Gemini
    const imageInputs = [];
    
    // Add reference images
    referenceImages.forEach((imageDataUrl, index) => {
      const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, "");
      imageInputs.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/png"
        }
      });
    });
    
    // Add pose sketch
    const poseBase64 = poseSketch.replace(/^data:image\/\w+;base64,/, "");
    imageInputs.push({
      inlineData: {
        data: poseBase64,
        mimeType: "image/png"
      }
    });

    // Create the fusion prompt with strict character consistency and pose matching
    const fusionPrompt = `
TASK: Generate image with EXACT character consistency and pose matching.

INPUT ANALYSIS:
1. Reference characters (first ${referenceImages.length} images): These are the EXACT characters to reproduce
2. Pose sketch (last image): White lines on dark background showing target poses
3. Scene: ${sceneDescription}

STRICT REQUIREMENTS:

CHARACTER CONSISTENCY (100% match from reference):
- Face: EXACT same facial features, eye shape, eye color, expressions
- Hair: EXACT same hairstyle, color, length, accessories
- Clothing: EXACT same outfit, colors, patterns, details
- Accessories: ALL same items (glasses, jewelry, bags, etc)
- Art style: MAINTAIN exact style from reference image

POSE ACCURACY (from sketch):
- Body position: EXACTLY match the white line sketch positions
- Arms: Match exact arm positions and angles
- Legs: Match exact leg positions and stances  
- Head tilt: Match head angle if visible
- If multiple figures: Preserve exact spatial relationships

SCENE INTEGRATION:
- Place characters naturally in: ${sceneDescription}
- Maintain lighting consistent with scene
- Add appropriate background elements

CRITICAL: The generated characters MUST be immediately recognizable as the SAME characters from the reference images, just in the new pose from the sketch.

Aspect ratio: ${aspectRatio}`;

    // Use Gemini 2.5 Flash Image (aka Nano Banana) for better character consistency
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: [
        ...imageInputs,
        { text: fusionPrompt }
      ],
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      }
    });

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No image generated");
    }

    const content = candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("Invalid response format");
    }

    // Extract the generated image
    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        const imageData = Buffer.from(part.inlineData.data, "base64");
        return {
          success: true,
          imageData
        };
      }
    }

    throw new Error("No image data in response");

  } catch (error) {
    console.error("Pose fusion generation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Generation failed"
    };
  }
}

// Alternative approach using edit prompt
export async function generatePoseFusionEdit(
  referenceImage: string,
  poseSketch: string,  
  prompt: string
): Promise<{ success: boolean; imageData?: Buffer; error?: string }> {
  try {
    const refBase64 = referenceImage.replace(/^data:image\/\w+;base64,/, "");
    const poseBase64 = poseSketch.replace(/^data:image\/\w+;base64,/, "");

    const editPrompt = `
CRITICAL: Character-consistent pose editing task.

INPUTS:
1. Original character image (first image) - This is the EXACT character to preserve
2. Target pose sketch (second image) - White lines showing the new pose to apply
3. Scene request: ${prompt}

MANDATORY PRESERVATION:
- Face: Keep EXACT same facial features, expressions, eye color
- Hair: Keep EXACT same hairstyle, color, accessories
- Clothing: Keep EXACT same outfit, patterns, colors, details
- Accessories: Keep ALL items (glasses, jewelry, etc)
- Art style: Maintain EXACT rendering style

POSE CHANGE:
- Body position: Change to EXACTLY match the white line sketch
- Arms/legs: Match the exact positions shown in sketch
- Maintain character proportions

The result MUST be the SAME character, just in the new pose.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview", 
      contents: [
        {
          inlineData: {
            data: refBase64,
            mimeType: "image/png"
          }
        },
        {
          inlineData: {
            data: poseBase64,
            mimeType: "image/png"
          }
        },
        { text: editPrompt }
      ],
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      }
    });

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No image generated");
    }

    const content = candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("Invalid response format");
    }

    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        const imageData = Buffer.from(part.inlineData.data, "base64");
        return {
          success: true,
          imageData
        };
      }
    }

    throw new Error("No image data in response");
    
  } catch (error) {
    console.error("Pose edit generation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Edit failed"
    };
  }
}