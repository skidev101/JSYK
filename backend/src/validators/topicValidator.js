const { body, param } = require('express-validator');

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

    body('topicImgUrls')
      .optional()
      .isArray({ max: 2 })
      .withMessage('Images must be an array of at most 2 urls'),

   body('topicImgUrls')
      .optional({ nullable: true })
      .isURL()
      .withMessage('Invalid URL')
];

const validateTopicId = [
  param('topicId')
    .trim()
    .notEmpty()
    .withMessage('Topic id is required')
    .isLength({ min: 8, max: 8 })
    .withMessage('Invalid topic ID'),

  param('profileSlug')
    .trim()
    .notEmpty()
    .withMessage('Pofile slug is required')
];

module.exports = {
  validateCreateTopic,
  validateTopicId
};
