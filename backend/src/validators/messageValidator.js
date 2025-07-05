const { body } = require('express-validator');

const validateSendMessage = [
   body("content")
      .trim()
      .notEmpty()
      
]