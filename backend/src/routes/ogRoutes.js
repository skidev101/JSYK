import express from "express";
const router = express.Router();
import { generateOgImage, getOgPage } from "../controllers/ogController.js";

// Social platforms scrape this one
router.get("/:messageId", getOgPage);

// Image renderer for og:image
router.get("/:messageId", generateOgImage);

export default router;
