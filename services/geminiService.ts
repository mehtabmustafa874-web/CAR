
import { GoogleGenAI } from "@google/genai";
import { Car, SearchParams } from "../types";

// Initializing GoogleGenAI exclusively using process.env.API_KEY as a named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCarRecommendation(params: SearchParams, availableCars: Car[]): Promise<string> {
  try {
    const carList = availableCars.map(c => `${c.brand} ${c.name} (${c.type}, $${c.pricePerDay}/day)`).join(", ");
    const prompt = `Based on a rental location in "${params.location}" from ${params.pickupDate} to ${params.returnDate}, which of these cars would you recommend and why? Keep it brief and persuasive. Cars: ${carList}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    return response.text || "I recommend checking out our Tesla Model S for a premium experience!";
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return "Our top pick for this trip is the BMW X5 for its versatility and comfort.";
  }
}

export async function askSwiftAI(query: string, availableCars: Car[]): Promise<string> {
  try {
    const carList = availableCars.map(c => `${c.brand} ${c.name} - ${c.type} at $${c.pricePerDay}/day. Key features: ${c.features.join(", ")}`).join("\n");
    const systemInstruction = `You are SwiftAI, the premium concierge for SwiftDrive, a luxury car rental app. 
    Users can browse cars, filter by price/type, and book them. 
    Current available fleet:
    ${carList}
    
    Answer user questions professionally, helpfully, and with a touch of luxury. 
    If they ask for suggestions, pick the best matching cars from the list above. 
    If they ask about app features, tell them they can search, filter, and view 4-photo galleries (front, back, interior, exterior) for every car.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    return response.text || "I'm here to help you find the perfect drive. What can I assist you with today?";
  } catch (error) {
    console.error("SwiftAI Query Error:", error);
    return "I'm currently optimizing my systems. Please try again in a moment, or browse our elite collection below.";
  }
}
