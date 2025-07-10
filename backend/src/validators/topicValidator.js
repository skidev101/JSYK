const { body } = require('express-validator');

const validateCreateTopic = [
   body('topic')
      .trim()
      .notEmpty()
      .withMessage('Topic title is required')
      .isLength({ max: 100 })
      .withMessage('Topic must be less than 100 characters'),

   body('themeColor')
    .optional({ nullable: true })
    .matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
    .withMessage('Theme color must be a valid hex code'),

   body('topicImgUrl')
      .optional({ nullable: true })
      .isURL()
      .withMessage('Invalid URL')
];

const validateDeleteTopic = [
  body('topicId')
    .trim()
    .notEmpty()
    .withMessage('Topic ID is required')
    .isLength({ min: 8, max: 8 })
    .withMessage('Invalid topic ID')
];

module.exports = {
  validateCreateTopic,
  validateDeleteTopic
};
