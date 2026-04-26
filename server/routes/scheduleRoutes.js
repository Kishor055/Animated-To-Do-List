import express from "express";

const router = express.Router();

// Simple AI scheduling logic (upgradeable to GPT)
router.post("/plan", (req, res) => {
  const { tasks } = req.body;

  const schedule = tasks.map((t, i) => ({
    task: t,
    time: `${9 + i}:00 AM`
  }));

  res.json({ schedule });
});

export default router;