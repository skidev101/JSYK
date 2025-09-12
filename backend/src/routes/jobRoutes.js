// routes/jobRoutes.js
import express from "express";
import { imageCleanupJob } from "../jobs/imageCleanupJob.js";
import { resetDailyViews } from "../jobs/resetViewsJob.js";

const router = express.Router();

// POST /api/jobs/cleanup-images
router.post("/cleanup-images", async (req, res) => {
  try {
    const { secret } = req.query;

    if (secret !== process.env.CRON_SECRET) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await imageCleanupJob();
    res.json({ success: true, message: "Cleanup executed" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/jobs/reset-views
router.post("/reset-views", async (req, res) => {
  try {
    const { secret } = req.query;

    if (secret !== process.env.CRON_SECRET) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await resetDailyViews();
    res.json({ success: true, message: "Views reset" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
