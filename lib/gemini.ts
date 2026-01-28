import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// Model for image generation and editing
const IMAGE_MODEL = "gemini-2.0-flash-exp";

/**
 * Generate an image with the product placed on a new background
 */
export async function generateProductOnBackground(
  productImageBase64: string,
  backgroundPrompt: string,
): Promise<string> {
  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: productImageBase64,
            },
          },
          {
            text: `You are a professional product photographer. Take this product image and create a new stunning e-commerce photo with the following background: "${backgroundPrompt}". 
            
Instructions:
1. Extract the main product from the original image
2. Remove the original background completely
3. Place the product naturally on the requested background scene
4. Ensure professional lighting and shadows
5. Make it look like a high-quality e-commerce product photo

Generate only the final composite image.`,
          },
        ],
      },
    ],
    config: {
      responseModalities: ["image", "text"],
    },
  });

  // Extract generated image from response
  const parts = response.candidates?.[0]?.content?.parts;
  if (parts) {
    for (const part of parts) {
      if (part.inlineData?.data) {
        return part.inlineData.data;
      }
    }
  }

  throw new Error("No image generated in response");
}

/**
 * Analyze product in image for better processing
 */
export async function analyzeProduct(
  productImageBase64: string,
): Promise<string> {
  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: productImageBase64,
            },
          },
          {
            text: "Briefly describe this product in 1-2 sentences. What is it and what are its key visual features?",
          },
        ],
      },
    ],
  });

  return response.text || "Product image";
}

export { ai };
