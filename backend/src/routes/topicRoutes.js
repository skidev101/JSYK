const express = require('express');
const router = express.Router();
const { createTopic, deleteTopic, getUserTopics, getTopic, getTopicInfo } = require('../controllers/topicController');
const verifyToken = require('../middleware/verifyToken');
const { validateCreateTopic, validateTopicId } = require('../validators/topicValidator');
const validateRequest = require('../middleware/validateRequest');

router
   .get('/', verifyToken, getUserTopics)
   .get('/:profileSlug/:topicId', validateTopicId, validateRequest, getTopicInfo)
   .get('/:topicId', validateTopicId, validateRequest, getTopic)
   .post('/', verifyToken, validateCreateTopic, validateRequest, createTopic)
   .delete('/:topicId', validateTopicId, validateRequest, deleteTopic);

module.exports = router;