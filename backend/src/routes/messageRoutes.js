const express = require('express');
const router = express.Router();
const { getUserMessages, getMessage, sendMessage, markAsRead, deleteMessage } = require('../controllers/messageController');
const limitSendMessage = require('../middleware/rateLimiter');
const verifyToken = require('../middleware/verifyToken');
const validateRequest = require('../middleware/validateRequest');
const logSenderInfo = require('../middleware/logSenderInfo');
const { validateSendMessage, validateMessageAction } = require('../validators/messageValidator');
router
   .get('/', verifyToken, getUserMessages)
   .get('/:messageId', verifyToken, getMessage)
   .patch('/', verifyToken, validateMessageAction, validateRequest, markAsRead)
   .post('/', limitSendMessage, logSenderInfo, validateSendMessage, validateRequest, sendMessage)
   .delete('/:messageId', verifyToken, validateMessageAction, validateRequest, deleteMessage)



module.exports = router; 