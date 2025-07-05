const express = require('express');
const router = express().router;
const { getAllMessages } = require('../controllers/messageController');

router.get('/', getAllMessages)
