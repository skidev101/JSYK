const express = require('express');
const router = express.Router();
const { getPublicProfile, checkUsernameAvailability, updateProfile } = require('../controllers/profileController')
const verifyToken = require('../middleware/verifyToken');
const validateRequest = require('../middleware/validateRequest');
const logSenderInfo = require('../middleware/logSenderInfo');
const rateLimiter = require('../middleware/rateLimiter');
const { validateUsername } = require('../validators/authValidator');

router
   .get('/:profileSlug', logSenderInfo, rateLimiter, getPublicProfile)
   .get('/', validateUsername, validateRequest, checkUsernameAvailability)
   .patch('/', verifyToken, updateProfile);

module.exports = router