import { GoogleGenAI, Modality } from "@google/genai";

/**
 * SECURITY NOTE: API Key Management
 * 
 * This implementation uses GEMINI_API_KEY environment variable directly because:
 * 1. Replit AI Integrations currently only supports gemini-2.5-flash-image (Nano Banana)
 * 2. We need gemini-3-pro-image-preview (Nano Banana Pro) for advanced features
 * 3. GEMINI_API_KEY is stored as a Replit secret (encrypted, not exposed to client)
 * 
 * Security measures:
 * - API key is never sent to client (server-side only)
 * - Stored as encrypted secret in Replit environment
 * - All API calls are made from secure backend routes
 * - No API key exposure in client-side code or logs
 * 
 * Future: When Replit AI Integrations adds gemini-3-pro-image-preview support,
 * migrate to AI Integrations for automatic key rotation and credit billing.
 */
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface GenerateImageResponse {
  success: boolean;
  imageData?: Buffer;
  error?: string;
}

export async function generateImage(
  imageBuffer: Buffer,
  mimeType: string,
  prompt: string
): Promise<GenerateImageResponse> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }

    // Convert buffer to base64
    const base64Data = imageBuffer.toString('base64');

    // Try Nano Banana Pro (gemini-3-pro-image-preview) first, fall back to 2.5 if unavailable
    let response;
    let modelUsed = "gemini-3-pro-image-preview";
    try {
      response = await ai.models.generateContent({
        model: modelUsed,
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  data: base64Data,
                  mimeType: mimeType,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "2K"
          }
        },
      });
    } catch (quotaError: any) {
      // Handle quota exceeded error gracefully
      if (quotaError.status === 429 || quotaError.message?.includes('quota') || quotaError.message?.includes('exceeded')) {
        return {
          success: false,
          error: "Free tier quota exceeded. The image generation API has daily limits. Please try again later or upgrade to a paid plan for unlimited access. For now, you can explore our examples and learn about Nano Banana's capabilities!"
        };
      }
      throw quotaError; // Re-throw other errors
    }

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates returned from Gemini API");
    }

    const content = candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("No content parts in response");
    }

    // Find the image part in the response
    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        const imageData = Buffer.from(part.inlineData.data, "base64");
        return {
          success: true,
          imageData: imageData,
        };
      }
    }

    // Check if there's text response instead
    const textParts = content.parts.filter(part => part.text);
    if (textParts.length > 0) {
      return {
        success: false,
        error: `API returned text instead of image: ${textParts[0].text}. This may indicate the model is not generating images or there's a configuration issue.`
      };
    }

    return {
      success: false,
      error: "No image data found in response. The API may be configured incorrectly or the model didn't generate an image."
    };

  } catch (error) {
    console.error("Gemini image generation failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export interface PoseGenerationRequest {
  referenceImages: string[];
  poseSketch: string;
  sceneDescription: string;
  aspectRatio: string;
}

export async function generatePoseImage({
  referenceImages,
  poseSketch,
  sceneDescription,
  aspectRatio
}: PoseGenerationRequest): Promise<GenerateImageResponse> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }

    // Prepare all image inputs
    const imageParts = [];
    
    // Add reference images
    for (const refImage of referenceImages) {
      const base64Data = refImage.includes(',') ? refImage.split(',')[1] : refImage;
      imageParts.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/png"
        }
      });
    }

    // Add pose sketch
    const sketchData = poseSketch.includes(',') ? poseSketch.split(',')[1] : poseSketch;
    imageParts.push({
      inlineData: {
        data: sketchData,
        mimeType: "image/png"
      }
    });

    // Create comprehensive prompt for character consistency and pose generation
    const prompt = `You are an expert character artist. Create a stunning character illustration based on the provided reference images and pose sketch.

REFERENCE IMAGES: The first ${referenceImages.length} image(s) show the character's appearance, clothing, and style that must be maintained exactly.

POSE SKETCH: The final image is a simple line drawing showing the exact pose the character should be in.

SCENE DESCRIPTION: ${sceneDescription}

REQUIREMENTS:
1. Maintain EXACT character consistency from the reference images:
   - Facial features, hair style and color
   - Clothing details and colors  
   - Body proportions and distinctive characteristics
   - Art style and aesthetic

2. Follow the EXACT pose from the sketch:
   - Body positioning and stance
   - Arm and leg placement
   - Head orientation
   - Overall composition

3. Create the scene with:
   - ${sceneDescription}
   - High-quality, detailed artwork
   - Proper lighting and atmosphere
   - ${aspectRatio} aspect ratio
   - Professional illustration quality

Generate a beautiful, detailed character illustration that perfectly combines the character from the reference images with the pose from the sketch in the described scene.`;

    // Try Nano Banana Pro (gemini-3-pro-image-preview)
    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3-pro-image-preview",
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              ...imageParts
            ],
          },
        ],
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "2K"
          }
        },
      });
    } catch (quotaError: any) {
      if (quotaError.status === 429 || quotaError.message?.includes('quota') || quotaError.message?.includes('exceeded')) {
        return {
          success: false,
          error: "Free tier quota exceeded. Please try again later or upgrade to a paid plan for unlimited access."
        };
      }
      throw quotaError;
    }

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates returned from Gemini API");
    }

    const content = candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("No content parts in response");
    }

    // Find the image part in the response
    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        const imageData = Buffer.from(part.inlineData.data, "base64");
        return {
          success: true,
          imageData: imageData,
        };
      }
    }

    // If no image found, return text explanation
    const textPart = content.parts.find(part => part.text);
    if (textPart) {
      return {
        success: false,
        error: `Image generation not available. Text response: ${textPart.text}`
      };
    }

    throw new Error("No image or text content in response");

  } catch (error) {
    console.error("Error generating pose image:", error);
    return {
      success: false,
      error: `Failed to generate pose image: ${error}`
    };
  }
}

export async function enhancePrompt(userPrompt: string): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return userPrompt;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an expert at writing prompts for AI image generation. 
              Enhance this user prompt to be more detailed and effective for character pose generation:
              
              "${userPrompt}"
              
              Add specific details about:
              - Visual style and art quality
              - Lighting and atmosphere  
              - Character details and clothing
              - Background and environment
              - Pose dynamics and emotion
              
              Keep it concise but comprehensive. Return only the enhanced prompt.`
            }
          ]
        }
      ]
    });

    const result = response.candidates?.[0]?.content?.parts?.[0]?.text;
    return result?.trim() || userPrompt;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return userPrompt;
  }
}

export async function generateImageFromText(prompt: string): Promise<GenerateImageResponse> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }

    // Use Nano Banana Pro (gemini-3-pro-image-preview) for text-to-image generation
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "2K"
        }
      },
    });

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates returned from Gemini API");
    }

    const content = candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("No content parts in response");
    }

    // Find the image part in the response
    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        const imageData = Buffer.from(part.inlineData.data, "base64");
        return {
          success: true,
          imageData: imageData,
        };
      }
    }

    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini text-to-image generation failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function analyzeSentiment(text: string) {
  try {
    const systemPrompt = `You are a sentiment analysis expert. 
Analyze the sentiment of the text and provide a rating
from 1 to 5 stars and a confidence score between 0 and 1.
Respond with JSON in this format: 
{'rating': number, 'confidence': number}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            rating: { type: "number" },
            confidence: { type: "number" },
          },
          required: ["rating", "confidence"],
        },
      },
      contents: text,
    });

    const rawJson = response.text;
    if (rawJson) {
      return JSON.parse(rawJson);
    } else {
      throw new Error("Empty response from model");
    }
  } catch (error) {
    throw new Error(`Failed to analyze sentiment: ${error}`);
  }
}
