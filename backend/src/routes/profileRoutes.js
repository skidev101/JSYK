import express from "express";
const router = express.Router();
import {
  getPublicProfile,
  checkUsernameAvailability,
  updateProfile,
} from "../controllers/profileController.js";
import verifyToken from "../middleware/verifyToken.js";
import validateRequest from "../middleware/validateRequest.js";
import logSenderInfo from "../middleware/logSenderInfo.js";
import rateLimiter from "../middleware/rateLimiter.js";
import { validateUsername } from "../validators/authValidator.js";

router
  .get("/:profileSlug", logSenderInfo, rateLimiter, getPublicProfile)
  .get("/", validateUsername, validateRequest, checkUsernameAvailability)
  .patch("/", verifyToken, updateProfile);

export default router;
