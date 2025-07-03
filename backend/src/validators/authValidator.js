const { body } = require('express-validator');

exports.validateUsername = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3–15 characters long")
    .matches(/^[\p{L}\p{N}_\u{1F600}-\u{1F64F}]*$/u) // emojis, letters, numbers, underscore
    .withMessage("Username contains invalid characters"),
];