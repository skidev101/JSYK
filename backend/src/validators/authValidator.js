const { body } = require('express-validator');
const emojiRegex = require('emoji-regex');

exports.validateUsername = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage("Username must be 3-10 characters long")
    .custom((value) => {
      const chars = [...value];
      const valid = chars.every(
        (char) => allowed.test(char) || emojiPattern.test(char)
      );
      if (!valid) {
        throw new Error("Username contains invalid characters");
      }
      return true;
    })
];