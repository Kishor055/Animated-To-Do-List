import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

/**
 * 📌 GET all todos
 */
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

/**
 * 📌 CREATE todo
 * (AI priority can be injected later from AI service)
 */
router.post("/", async (req, res) => {
  try {
    const { text, priority, dueDate } = req.body;

    const todo = await Todo.create({
      text,
      priority: priority || "LOW",
      dueDate: dueDate || null,
      done: false
    });

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

/**
 * 📌 TOGGLE COMPLETE / INCOMPLETE
 */
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.done = !todo.done;
    todo.updatedAt = Date.now();

    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

/**
 * 📌 UPDATE todo (future AI edits support)
 */
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to patch todo" });
  }
});

/**
 * 📌 DELETE todo
 */
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

export default router;