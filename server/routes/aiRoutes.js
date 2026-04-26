import dotenv from "dotenv";
dotenv.config({ path: new URL("../.env", import.meta.url) });

import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 💬 AI Chat Assistant
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a productivity assistant. Help users manage tasks, prioritize work, and plan schedules."
        },
        { role: "user", content: message }
      ]
    });
    res.json({
      reply: response.choices[0].message.content
    });
  } catch (err) {
    res.status(500).json({ error: "AI error" });
  }
});

export default router;