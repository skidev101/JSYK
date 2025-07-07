const express = require('express');
const router = express().router;
const { getAllMessages, sendMessage, markAsRead, deleteMessage } = require('../controllers/messageController');
const verifyToken = require('../middleware/verifyToken');
const validateRequest = require('../middleware/validateRequest');
const { validateSendMessage, validateMessageAction } = require('../validators/messageValidator');

router.get('/', verifyToken, getAllMessages)
router.get('/:messageId', verifyToken, validateMessageAction, validateRequest, markAsRead)
router.post('/', verifyToken, validateSendMessage, validateRequest, sendMessage)
router.delete('/:messageId', verifyToken, validateMessageAction, validateRequest, deleteMessage)



module.exports = router; 