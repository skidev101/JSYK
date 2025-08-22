const { body, param } = require('express-validator');

exports.validateSendMessage = [
   body("content")
      .trim()
      .notEmpty()
      .withMessage("Mesage content is required"),
   body("themeColor")
      .trim()
      .notEmpty()
      .withMessage("ThemeColor is required")
];

exports.validateMessageAction = [
   param("messageId")
      .trim()
      .notEmpty()
      .withMessage("message ID is required")
]