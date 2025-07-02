const express = require('express');
const router = express.Router();
const { handleAuth, getCurrentUser } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

router.route('/')
   .get(verifyToken, getCurrentUser)
   .post(verifyToken, handleAuth);

module.exports = router;