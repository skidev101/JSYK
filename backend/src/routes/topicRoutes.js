const express = require('express');
const router = express.Router();
const { createTopic, deleteTopic, getUserTopics } = require('../controllers/topicController');
const verifyToken = require('../middleware/verifyToken');
const { validateCreateTopic, validateDeleteTopic } = require('../validators/topicValidator');
const validateRequest = require('../middleware/validateRequest');

router
   .get('/', getUserTopics)
   .post('/', validateCreateTopic, validateRequest, createTopic)
   .delete('/', deleteTopic);

module.exports = router;