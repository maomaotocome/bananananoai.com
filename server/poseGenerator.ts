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

    // Create the fusion prompt
    const fusionPrompt = `
You are an expert AI artist specializing in character fusion and pose transfer.

Task: Create a new illustration by combining these elements:
1. Character appearance from the reference image(s) (first ${referenceImages.length} images)
2. Exact pose from the sketch (last image with white lines on dark background)
3. Scene and atmosphere: ${sceneDescription}

Critical requirements:
- MAINTAIN exact character features from references (hair, clothing, colors, style)
- FOLLOW the pose sketch precisely - match all body positions and gestures
- Blend characters naturally into the requested scene
- Use professional anime/manga illustration style
- Ensure high quality, vibrant colors, and clear details
- Aspect ratio: ${aspectRatio}

Generate a cohesive, high-quality illustration that perfectly combines all these elements.`;

    // Use Gemini's image generation with references
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [
        ...imageInputs,
        { text: fusionPrompt }
      ],
      config: {
        responseModalities: [Modality.IMAGE],
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
Edit this image to match the pose shown in the sketch while maintaining the character's appearance.
The sketch shows white lines indicating the desired pose.
Additional requirements: ${prompt}
Keep the character's face, hair, clothing, and colors exactly the same.
Only change the pose to match the sketch.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation", 
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
        responseModalities: [Modality.IMAGE],
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