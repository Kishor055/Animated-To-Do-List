import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import todoRoutes from "./routes/todoRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/smarttodo");

app.use("/todos", todoRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/ai", aiRoutes);
app.use("/schedule", scheduleRoutes);

app.listen(5000, () => console.log("Server running on 5000"));
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "gpt-5-nano",
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(response.choices[0].message.content);
