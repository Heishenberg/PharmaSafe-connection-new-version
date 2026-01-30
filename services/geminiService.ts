
import { GoogleGenAI } from "@google/genai";
import { MedicineAnalysis, RiskLevel } from "../types";

// Helper to convert File to Base64
async function fileToGenerativePart(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Main function for Batch Scanning & Scientific Research
 * Identifies multiple items, their Medical Usage, and Disposal Methods.
 */
export const analyzeMultipleMedicines = async (imageFile: File): Promise<MedicineAnalysis[]> => {
  try {
    // Initialize the client
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using 'gemini-3-flash-preview' (Project standard for 'flash') for speed and vision capabilities
    const model = 'gemini-3-flash-preview';

    const base64Data = await fileToGenerativePart(imageFile);

    const prompt = `
      Analyze this image and identify EVERY distinct medicine item (strips, bottles, tubes).
      
      For EACH distinct item found, act as a Pharmacist & Waste Expert and return:
      1. Identity: Name and Type.
      2. Usage: What is it used for? (Crucial: e.g., 'Painkiller', 'Cough Suppressant', 'Antibiotic', 'Antihistamine', 'Vitamin Supplement').
      3. Risk: High/Medium/Low.
      4. User Advice: Simple disposal + Eco-tip.
      5. Admin Advice: The specific Industrial Disposal Method.

      Strict Output Format: JSON Array of Objects. No markdown.
      Fields per object:
      - id: string (unique)
      - name: string (Brand or Generic name)
      - usage: string (e.g., 'Painkiller (Paracetamol)', 'Antibiotic', 'Vitamin')
      - type: string (e.g., 'Tablet Strip', 'Syrup Bottle')
      - riskLevel: string ('HIGH', 'MEDIUM', 'LOW')
      - userDisposal: string (Simple instruction for the user)
      - userEcoTip: string (Research-backed tip or 'N/A' if high risk)
      - adminIndustrialMethod: string (Technical method for factory use)
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: imageFile.type || 'image/jpeg',
              data: base64Data
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

    const text = response.text || "[]";
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let rawData: any[] = [];
    try {
        rawData = JSON.parse(cleanText);
        if (!Array.isArray(rawData)) {
            // Handle case where model returns a single object instead of array
            rawData = [rawData];
        }
    } catch (e) {
        console.warn("JSON Parse Error, attempting fallback", e);
        return createFallback();
    }

    // Map to application's MedicineAnalysis interface
    return rawData.map((item: any) => ({
      id: item.id || `item_${Math.random().toString(36).substr(2, 9)}`,
      name: item.name || "Unknown Medicine",
      // Mapping 'usage' to 'composition' so it displays the medical use (e.g. "Painkiller") on the card
      composition: item.usage || item.type || "Standard Medicine", 
      expiryDate: "Check Packaging", // Auto-detection of expiry is unreliable in batch view
      riskLevel: normalizeRisk(item.riskLevel),
      riskReason: `${item.usage} (${item.type}) identified as ${item.riskLevel} Risk`,
      disposalRecommendation: item.userDisposal || "Dispose safely via agent",
      userEcoTip: item.userEcoTip,
      adminIndustrialMethod: item.adminIndustrialMethod
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    return createFallback();
  }
};

/**
 * Backward Compatibility Wrapper
 * Allows existing ScanPage to work without refactoring, utilizing the new batch logic.
 */
export const analyzeMedicineImage = async (base64Data: string): Promise<MedicineAnalysis> => {
  try {
    // Convert base64 string back to a File object to reuse the robust batch logic
    const res = await fetch(`data:image/jpeg;base64,${base64Data}`);
    const blob = await res.blob();
    const file = new File([blob], "single_scan_capture.jpg", { type: "image/jpeg" });
    
    const results = await analyzeMultipleMedicines(file);
    return results[0] || createFallback()[0];
  } catch (error) {
    console.error("Single Scan Wrapper Error:", error);
    return createFallback()[0];
  }
};

// Helper to normalize Risk Level strings to Enum
const normalizeRisk = (level: string): RiskLevel => {
  const up = (level || '').toUpperCase();
  if (up.includes('HIGH')) return RiskLevel.HIGH;
  if (up.includes('MEDIUM')) return RiskLevel.MEDIUM;
  if (up.includes('LOW')) return RiskLevel.LOW;
  return RiskLevel.UNKNOWN;
};

// Fallback logic for errors
const createFallback = (): MedicineAnalysis[] => {
  return [{
    name: "Unidentified Item",
    composition: "Unknown Usage",
    expiryDate: "N/A",
    riskLevel: RiskLevel.UNKNOWN,
    riskReason: "Could not identify distinct items in image.",
    disposalRecommendation: "Please consult a pharmacist.",
    userEcoTip: "Handle with care.",
    adminIndustrialMethod: "Manual Sorting Required"
  }];
};
