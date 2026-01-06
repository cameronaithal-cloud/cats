
import { GoogleGenAI, Type } from "@google/genai";
import { CATS } from "../data/cats";
import { Message, MatchResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCatMatch = async (userDescription: string): Promise<MatchResult[]> => {
  const catsSummary = CATS.map(c => `ID: ${c.id}, Name: ${c.name}, Breed: ${c.breed}, Personality: ${c.personality.join(', ')}, Energy: ${c.energyLevel}`).join('\n');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this user's lifestyle/preferences: "${userDescription}", select the top 3 best matching cats from this list:\n${catsSummary}`,
    config: {
      systemInstruction: "You are an expert feline behaviorist and matchmaker. Return your recommendations in JSON format.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            catId: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            matchPercentage: { type: Type.NUMBER }
          },
          required: ["catId", "reasoning", "matchPercentage"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse match results", e);
    return [];
  }
};

export const getCatAdvice = async (history: Message[]): Promise<string> => {
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: contents as any,
    config: {
      systemInstruction: "You are 'Whisker', a friendly cat expert assistant at 'Whisker Wonders'. You help people learn about cat breeds, care, and behavior. Keep your tone warm, professional, and helpful. Mention specific breeds from our catalog if relevant: " + CATS.map(c => c.breed).join(', '),
    }
  });

  return response.text || "I'm sorry, I couldn't process that. Meow!";
};
