import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

/**
 * 📊 GET /analytics
 * Returns productivity insights for dashboard + charts
 */
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();

    const total = todos.length;
    const completed = todos.filter((t) => t.done).length;
    const pending = total - completed;

    const completionRate = total === 0 ? 0 : (completed / total) * 100;

    // 📌 Priority breakdown
    const high = todos.filter((t) => t.priority === "HIGH").length;
    const medium = todos.filter((t) => t.priority === "MEDIUM").length;
    const low = todos.filter((t) => t.priority === "LOW").length;

    // 📅 Daily creation trend (last 7 days simple grouping)
    const last7Days = {};

    const now = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const key = date.toISOString().split("T")[0];
      last7Days[key] = 0;
    }

    todos.forEach((todo) => {
      const key = new Date(todo.createdAt)
        .toISOString()
        .split("T")[0];

      if (last7Days[key] !== undefined) {
        last7Days[key]++;
      }
    });

    res.json({
      total,
      completed,
      pending,
      completionRate: Number(completionRate.toFixed(2)),

      priority: {
        high,
        medium,
        low
      },

      weeklyTrend: Object.entries(last7Days).map(([date, count]) => ({
        date,
        count
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analytics error" });
  }
});

export default router;