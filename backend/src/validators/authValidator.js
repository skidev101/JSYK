const { body } = require('express-validator');
const emojiRegex = require('emoji-regex');
const emojiPattern = emojiRegex();

exports.validateUsername = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage("Username must be 3-10 characters long")
    .custom((value) => {
      const emojiMatches = value.match(emojiPattern) || [];
      const textWithoutEmojis = value.replace(emojiPattern, '');
      const visualLength = emojiMatches.length + textWithoutEmojis.length;

      // Check length
      if (visualLength < 3) {
        throw new Error("Username must be at least 3 characters");
      }
      if (visualLength > 10) {
        throw new Error("Username must be less than 10 characters");
      }

      // Check for invalid characters
      const withoutEmojis = value.replace(emojiPattern, '');
      const hasValidChars = /^[\p{L}\p{N}_-]*$/u.test(withoutEmojis);
      
      if (!hasValidChars) {
        throw new Error("Username contains invalid characters");
      }

      return true;
    })
];