import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Check API key
if (!process.env.GEMINI_API_KEY) {
  console.log("❌ GEMINI API KEY MISSING");
} else {
  console.log("✅ GEMINI API KEY LOADED");
}

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message provided" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are a kind emotional support AI. User says: ${message}`,
    });

    res.json({
      reply: response.text,
    });

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);
    res.status(500).json({ reply: error.message });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});