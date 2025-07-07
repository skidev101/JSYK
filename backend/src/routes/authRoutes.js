const express = require('express');
const router = express.Router();
const { handleAuth, getCurrentUser } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const { validateUsername } = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');

router.route('/')
   .get(verifyToken, getCurrentUser)
   .post(verifyToken, validateUsername, validateRequest, handleAuth);

module.exports = router;