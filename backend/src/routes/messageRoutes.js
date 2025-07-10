const express = require('express');
const router = express.Router();
const { getUserMessages, sendMessage, markAsRead, deleteMessage } = require('../controllers/messageController');
const verifyToken = require('../middleware/verifyToken');
const validateRequest = require('../middleware/validateRequest');
const rateLimiter = require('../middleware/rateLimiter');
const logSenderInfo = require('../middleware/logSenderInfo');
const { validateSendMessage, validateMessageAction } = require('../validators/messageValidator');

router
   .get('/', getUserMessages)
   .patch('/', markAsRead)
   .post('/', rateLimiter, logSenderInfo, sendMessage)
   .delete('/', deleteMessage)



module.exports = router; 