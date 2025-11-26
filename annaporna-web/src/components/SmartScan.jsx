import { useState, useRef } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("⚠️ Gemini API Key not found. SmartScan will not work. Please add VITE_GEMINI_API_KEY to your .env file");
}

const SmartScan = ({ onScanComplete }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    if (!API_KEY) {
      alert("API key not configured. Please check your environment variables.");
      return;
    }

    setLoading(true);

    try {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
      let genAI;
      try {
        genAI = new GoogleGenerativeAI(API_KEY);
      } catch (e) {
        try {
          genAI = new GoogleGenerativeAI({ apiKey: API_KEY });
        } catch (e2) {
          throw new Error(`API client initialization failed: ${e.message || e} ${e2 ? ' / ' + (e2.message || e2) : ''}`);
        }
      }
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `You are a food donation platform AI. Analyze this food image and extract information.
IMPORTANT: Return ONLY a valid JSON object with NO markdown, NO backticks, NO additional text.

{
  "title": "short appetizing name (e.g., Spicy Paneer Curry)",
  "quantity": "serves estimate (e.g., Serves 5-6 people)",
  "type": "Veg or Non-Veg",
  "expiry": "pickup hours (e.g., 2)"
}`;

      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      
      if (!result.response) {
        throw new Error("No response from AI - request may have been blocked");
      }
      
      const response = await result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error("Empty response from AI");
      }

      let jsonString = text.trim();
      jsonString = jsonString.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      
      const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonString = jsonMatch[0];
      }
      
      if (!jsonString.startsWith('{')) {
        console.error("Raw response:", text);
        throw new Error("Invalid response format from AI - could not find JSON");
      }
      
      const data = JSON.parse(jsonString);

      if (!data.title || !data.quantity) {
        throw new Error("Missing required fields in AI response");
      }

      console.log("AI Scan Result:", data);
      onScanComplete(data, file); 

    } catch (error) {
      console.error("Smart Scan Failed:", error);
      console.error("Error details:", error.message, error.cause);
      
      let errorMessage = "Could not analyze image. Please try again.";
      
      if (error.message.includes("API key") || error.message.includes('API client initialization failed')) {
        errorMessage = "API key error. Please check your configuration.";
        console.error("SmartScan API Key Troubleshooting:\n");
      
      } else if (error.message.includes("Invalid response")) {
        errorMessage = "Could not analyze image. Please try a different image.";
      } else if (error.message.includes("Missing required fields")) {
        errorMessage = "Could not extract all information from image. Please try again.";
      } else if (error.message.includes("403") || error.message.includes("permission")) {
        errorMessage = "API access denied. Please check your API key.";
      } else if (error.message.includes("429")) {
        errorMessage = "Rate limit exceeded. Please try again in a moment.";
      } else if (error.message.includes("Failed to read")) {
        errorMessage = "Failed to read the image file. Please try again.";
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="mb-6">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileSelect}
      />
      
      <button 
        type="button"
        onClick={() => fileInputRef.current.click()}
        disabled={loading}
        className="w-full py-4 border-2 border-dashed border-brand-green bg-green-50 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-green-100 transition group
                   {/* NEW */} transform active:scale-95 duration-150"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin text-brand-green" size={32} />
            <span className="text-brand-green font-medium animate-pulse">Analyzing Food...</span>
          </>
        ) : (
          <>
            <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition">
                <Sparkles className="text-brand-orange" size={24} />
            </div>
            <span className="text-gray-600 font-medium">Tap for <span className="text-brand-orange font-bold">AI Smart Scan</span></span>
            <span className="text-xs text-gray-400">Auto-detects food name & quantity</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SmartScan;