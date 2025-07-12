const express = require('express');
const router = express.Router();
const { getUserMessages, getMessage, sendMessage, markAsRead, deleteMessage } = require('../controllers/messageController');
const verifyToken = require('../middleware/verifyToken');
const validateRequest = require('../middleware/validateRequest');
const rateLimiter = require('../middleware/rateLimiter');
const logSenderInfo = require('../middleware/logSenderInfo');
const { validateSendMessage, validateMessageAction } = require('../validators/messageValidator');

router
   .get('/', getUserMessages)
   .get('/:id', getMessage)
   .patch('/', validateMessageAction, validateRequest, markAsRead)
   .post('/', rateLimiter, logSenderInfo, validateSendMessage, validateRequest, sendMessage)
   .delete('/:id', validateMessageAction, validateRequest, deleteMessage)



module.exports = router; 