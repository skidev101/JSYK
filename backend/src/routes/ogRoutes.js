import express from "express";
const router = express.Router();
import { generateOgImage, getOgPage } from "../controllers/ogController.js";

// Social platforms scrape this one
router.get("/share/:messageId", getOgPage);

// Image renderer for og:image
router.get("/generate/:messageId", generateOgImage);

export default router;
