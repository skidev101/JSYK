const express = require('express');
const router = express.Router();
const { getPublicProfile, checkUsernameAvailability, updateProfile } = require('../controllers/profileController')
const validateRequest = require('../middleware/validateRequest');
const logSenderInfo = require('../middleware/logSenderInfo');
const rateLimiter = require('../middleware/rateLimiter');
const { validateUsername } = require('../validators/authValidator');

router.get('/:slug', logSenderInfo, rateLimiter, validateRequest, getPublicProfile);
router.get('/', verifyToken, validateUsername, validateRequest, checkUsernameAvailability);
router.patch('/', verifyToken, updateProfile);