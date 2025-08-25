const express = require('express');
const router = express.Router(); 
const { deleteUser } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.delete('/', verifyToken, deleteUser);

module.exports = router;