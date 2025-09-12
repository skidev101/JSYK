import express from "express";
const router = express.Router();
import { deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

router.delete("/", verifyToken, deleteUser);

export default router;
