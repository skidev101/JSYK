const express = require('express');
const router = express.Router(); 
const { getImageUploadSignature } = require('../services/imageKitService')

router.get('/', getImageUploadSignature);

module.exports = router;
