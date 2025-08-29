import express from 'express'; 
const router = express.Router();
import { handleAuth, getCurrentUser } from '../controllers/authController.js';
import verifyToken from '../middleware/verifyToken.js';
import { validateUsername } from '../validators/authValidator.js';
import validateRequest from '../middleware/validateRequest.js';

router.route('/')
   .get(verifyToken, getCurrentUser)
   .post(verifyToken, validateUsername, validateRequest, handleAuth);

module.exports = router;