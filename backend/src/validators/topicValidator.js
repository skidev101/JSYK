const { body, param } = from "express-validator");

const validateCreateTopic = [
  body("topic")
    .trim()
    .notEmpty()
    .withMessage("Topic title is required")
    .isLength({ max: 100 })
    .withMessage("Topic must be less than 100 characters"),

  body("themeColor")
    .optional({ nullable: true })
    .matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
    .withMessage("Theme color must be a valid hex code"),

  body("topicImgUrls")
    .optional({ nullable: true })
    .isArray({ max: 2 })
    .withMessage("Images must be an array of at most 2 items"),

  body("topicImgUrls.*.url")
    .if(body("topicImgUrls").exists())
    .isURL()
    .withMessage("Each image must have a valid URL"),

  body("topicImgUrls.*.fileId")
    .if(body("topicImgUrls").exists())
    .optional()
    .isString()
    .withMessage("FileId must be a string if provided"),
];

const validateTopicId = [
  param("topicId")
    .trim()
    .notEmpty()
    .withMessage("Topic id is required")
    .isLength({ min: 8, max: 8 })
    .withMessage("Invalid topic ID"),
];

const validateProfileSlug = [
  param("profileSlug")
    .trim()
    .notEmpty()
    .withMessage("Pofile slug is required"),
];

export default {
  validateCreateTopic,
  validateTopicId,
  validateProfileSlug
};
