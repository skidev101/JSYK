const express = require('express');
const router = express.Router();
const { handleAuth } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, handleAuth);

module.exports = router;