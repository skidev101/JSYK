import express from "express";
import { getAdminAnalytics } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { requireAdmin } from "../middleware/requireAdmin.js";


const router = express.Router();

router.get("/analytics", verifyToken, requireAdmin, getAdminAnalytics);

export default router;
