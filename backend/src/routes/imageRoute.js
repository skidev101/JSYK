import express from "express";
const router = express.Router();
import { getCloudinaryUploadSignature } from "../controllers/imageController.js";

router.get("/", getCloudinaryUploadSignature);

export default router;
