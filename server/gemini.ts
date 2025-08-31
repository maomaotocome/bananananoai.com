import { GoogleGenAI, Modality } from "@google/genai";

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

    // Try image generation first, fall back to text if quota exceeded
    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image-preview",
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
    console.log("Response structure:", JSON.stringify(response, null, 2));
    console.log("Content parts:", content.parts);
    
    for (const part of content.parts) {
      console.log("Part:", part);
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

export async function generateImageFromText(prompt: string): Promise<GenerateImageResponse> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
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
