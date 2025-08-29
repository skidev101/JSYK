import express from 'express'; 
const router = express.Router();
import { createTopic, deleteTopic, getUserTopics, getTopic, getTopicInfo } from '../controllers/topicController.js';
import verifyToken from '../middleware/verifyToken.js';
import { validateCreateTopic, validateTopicId, validateProfileSlug } from '../validators/topicValidator.js';
import validateRequest from '../middleware/validateRequest.js';

router
   .get('/', verifyToken, getUserTopics)
   .get('/:profileSlug/:topicId', validateProfileSlug, validateTopicId, validateRequest, getTopicInfo)
   .get('/:topicId', validateTopicId, validateRequest, getTopic)
   .post('/', verifyToken, validateCreateTopic, validateRequest, createTopic)
   .delete('/:topicId',verifyToken, validateTopicId, validateRequest, deleteTopic);

module.exports = router;