const express = require('express');
const router = express.Router();
const { createTopic, deleteTopic, getUserTopics } = require('../controllers/topicController');
const verifyToken = require('../middleware/verifyToken');
const { validateCreateTopic, validateDeleteTopic } = require('../validators/topicValidator');
const validateRequest = require('../middleware/validateRequest');

router
   .get('/', verifyToken, getUserTopics)
   .post('/', verifyToken, validateCreateTopic, validateRequest, createTopic)
   .delete('/:id', validateDeleteTopic, validateRequest, deleteTopic);

module.exports = router;