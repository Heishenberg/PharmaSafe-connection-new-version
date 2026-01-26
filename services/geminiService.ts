import { GoogleGenAI } from "@google/genai";
import { MedicineAnalysis, RiskLevel } from "../types";

const parseMedicineResponse = (text: string): MedicineAnalysis => {
  try {
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const rawData = JSON.parse(cleanText);

    // Map user-requested fields to the MedicineAnalysis interface
    return {
      name: rawData.brandName || "Unknown Medicine",
      composition: rawData.composition || "Unknown Composition",
      // The user prompt doesn't ask for expiry, so we set a default
      expiryDate: "Check Packaging", 
      riskLevel: rawData.riskLevel === 'High Risk' ? RiskLevel.HIGH : RiskLevel.LOW,
      riskReason: rawData.type ? `Identified as ${rawData.type}` : "Chemical composition analysis",
      disposalRecommendation: rawData.disposalAdvice || "Consult local guidelines."
    };
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    // Fallback if JSON parsing fails
    return {
      name: "Analysis Failed",
      composition: "N/A",
      expiryDate: "N/A",
      riskLevel: RiskLevel.UNKNOWN,
      riskReason: "Could not structure the AI response.",
      disposalRecommendation: "Please consult a pharmacist."
    };
  }
};

export const analyzeMedicineImage = async (base64Image: string): Promise<MedicineAnalysis> => {
  try {
    // Use process.env.API_KEY as per guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using 'gemini-3-flash-preview' as the recommended replacement for multimodal tasks.
    const model = 'gemini-3-flash-preview';
    
    const prompt = "Analyze this medicine packaging. Return a raw JSON object (no markdown) with these fields: brandName (string), composition (string), type (string: Antibiotic, Vitamin, Painkiller, etc.), riskLevel (string: 'High Risk' or 'Low Risk'), and disposalAdvice (string).";

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    return parseMedicineResponse(text);

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};