import express from "express";
import {
  getFeatureRequests,
  sendFeatureRequest,
} from "../controllers/featureRequestController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router
  .post("/", verifyToken, sendFeatureRequest)
  .get("/", verifyToken, requireAdmin, getFeatureRequests);


export default router;