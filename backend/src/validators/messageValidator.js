const { body } = require('express-validator');

const validateSendMessage = [
   body("content")
      .trim()
      .notEmpty()
      .withMessage("Mesage content is required")
];

module.exports = {
   validateSendMessage
}