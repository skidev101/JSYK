import express from 'express'; 
const router = express.Router();
import { getImageUploadSignature } from "../controllers/imageController.js";

router.get("/", getImageUploadSignature);

module.exports = router;