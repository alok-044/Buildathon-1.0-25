// services/ai.service.ts
import { GOOGLE_API_KEY } from "../utils/constants";
import { fileToBase64 } from "../utils/helpers";

export const aiService = {
  async scanFoodImage(imageUri: string) {
    try {
      console.log("Starting scan for:", imageUri);

      const base64Image = await fileToBase64(imageUri);
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Analyze this food image and return a strictly valid JSON object (no markdown, no backticks) with these fields:
                - title: A short, descriptive name of the food.
                - category: "Veg", "Non-Veg", "Fruit", "Bakery", or "Other".
                - quantity: An integer estimating the number of servings (default to 1 if unsure).
                - expiry: A short string estimation of shelf life (e.g., "24 hours", "3 days").`
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image
                }
              }
            ]
          }
        ]
      };

      // ✅ UPDATED: Using 'gemini-2.0-flash' which is available in your list
      const MODEL_NAME = "gemini-2.0-flash"; 
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GOOGLE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody)
        }
      );

      const result = await response.json();

      if (result.error) {
        console.error("GOOGLE API ERROR:", JSON.stringify(result.error, null, 2));
        throw new Error(result.error.message || "Google API Error");
      }

      if (result.candidates && result.candidates.length > 0) {
        const textResponse = result.candidates[0].content.parts[0].text;
        // Clean up markdown if Gemini adds it (e.g. ```json ... ```)
        const cleanedText = textResponse.replace(/```json|```/g, "").trim();
        const parsedData = JSON.parse(cleanedText);

        return {
          title: parsedData.title || "Detected Food",
          category: parsedData.category || "Other",
          quantity: parsedData.quantity || 1,
          expiry: parsedData.expiry || "24 hours"
        };
      } else {
        throw new Error("AI could not identify the image.");
      }

    } catch (error: any) {
      console.error("AI SERVICE EXCEPTION:", error);
      throw error;
    }
  },
};