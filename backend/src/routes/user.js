const express = require('express');
const router = express.Router(); 
const { checkUsername } = require('../controllers/userController');

router.get('/', checkUsername);

module.exports = router;
// This route checks if a username is available
// by querying the database for existing users with the same username.