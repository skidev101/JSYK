import express from "express";
import {
  getFeatureRequests,
  sendFeatureRequest,
} from "../controllers/featureRequestController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router
  .post("/", verifyToken, sendFeatureRequest)
  .get("/", verifyToken, getFeatureRequests);


export default router;