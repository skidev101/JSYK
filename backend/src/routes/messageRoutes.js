import express from 'express'; 
const router = express.Router();
import { getUserMessages, getMessage, sendMessage, deleteMessage } from '../controllers/messageController.js';
import limitSendMessage from '../middleware/rateLimiter.js';
import verifyToken from '../middleware/verifyToken.js';
import validateRequest from '../middleware/validateRequest.js';
import logSenderInfo from '../middleware/logSenderInfo.js';
import { validateSendMessage, validateMessageAction } from '../validators/messageValidator.js';
router
   .get('/', verifyToken, getUserMessages)
   .get('/:messageId', verifyToken, getMessage)
   .post('/', limitSendMessage, logSenderInfo, validateSendMessage, validateRequest, sendMessage)
   .delete('/:messageId', verifyToken, validateMessageAction, validateRequest, deleteMessage)



module.exports = router; 