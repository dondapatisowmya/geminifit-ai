
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, FitnessPlan, FitnessPlanResult, GroundingSource } from "../types";

export const generateFitnessPlan = async (profile: UserProfile): Promise<FitnessPlanResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const prompt = `
    Generate a personalized 7-day workout and diet plan for a beginner based on the following profile:
    Age: ${profile.age}
    Gender: ${profile.gender}
    Weight: ${profile.weight} kg
    Height: ${profile.height} cm
    Goal: ${profile.goal}
    Diet Preference: ${profile.dietPreference}
    Lifestyle: ${profile.lifestyle}

    REQUIREMENT: 
    1. Diet plan MUST strictly follow the ${profile.dietPreference} preference.
    2. Workout intensity should be adjusted for a ${profile.lifestyle} lifestyle.
    3. Use Google Search to find high-quality instructional YouTube video URLs for every exercise suggested.
    4. Calculate an appropriate daily water intake (in liters) for this user based on their weight and lifestyle.
    
    The plan should be safe, practical, and effective for beginners.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are an expert fitness coach and nutritionist. Use Google Search to provide accurate exercise technique videos and nutritional data. You MUST return a valid JSON object matching the requested schema. Ensure dietary restrictions are strictly followed.",
      responseMimeType: "application/json",
      tools: [{ googleSearch: {} }],
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          workoutPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                title: { type: Type.STRING },
                exercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      sets: { type: Type.STRING },
                      reps: { type: Type.STRING },
                      instruction: { type: Type.STRING },
                      videoUrl: { type: Type.STRING }
                    },
                    required: ["name", "sets", "reps", "instruction", "videoUrl"]
                  }
                }
              },
              required: ["day", "title", "exercises"]
            }
          },
          dietPlan: {
            type: Type.OBJECT,
            properties: {
              breakfast: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING }, calories: { type: Type.STRING } }, required: ["title", "description", "calories"] },
              lunch: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING }, calories: { type: Type.STRING } }, required: ["title", "description", "calories"] },
              snack: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING }, calories: { type: Type.STRING } }, required: ["title", "description", "calories"] },
              dinner: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING }, calories: { type: Type.STRING } }, required: ["title", "description", "calories"] }
            },
            required: ["breakfast", "lunch", "snack", "dinner"]
          },
          nutritionGuidance: {
            type: Type.OBJECT,
            properties: {
              dailyCalories: { type: Type.NUMBER },
              proteinGrams: { type: Type.NUMBER },
              fatsGrams: { type: Type.NUMBER },
              carbsGrams: { type: Type.NUMBER },
              proTip: { type: Type.STRING },
              waterIntakeLiters: { type: Type.NUMBER }
            },
            required: ["dailyCalories", "proteinGrams", "fatsGrams", "carbsGrams", "proTip", "waterIntakeLiters"]
          },
          safetyTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          lifestyleTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          motivation: { type: Type.STRING }
        },
        required: ["workoutPlan", "dietPlan", "nutritionGuidance", "safetyTips", "lifestyleTips", "motivation"]
      }
    }
  });

  const plan: FitnessPlan = JSON.parse(response.text || '{}');
  const sources: GroundingSource[] = [];
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  if (groundingChunks) {
    groundingChunks.forEach((chunk: any) => {
      if (chunk.web && chunk.web.uri) {
        sources.push({ uri: chunk.web.uri, title: chunk.web.title || chunk.web.uri });
      }
    });
  }

  return { plan, sources };
};
