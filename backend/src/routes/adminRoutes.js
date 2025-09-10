import express from "express";
import { getAdminAnalytics } from "../controllers/adminController.js";

const router = express.Router();

router.get("/analytics", getAdminAnalytics);

export default router;
