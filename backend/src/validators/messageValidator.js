import { body, param } from 'express-validator';

export const validateSendMessage = [
   body("content")
      .trim()
      .notEmpty()
      .withMessage("Mesage content is required"),
   body("themeColor")
      .trim()
      .notEmpty()
      .withMessage("ThemeColor is required")
];

export const validateMessageAction = [
   param("messageId")
      .trim()
      .notEmpty()
      .withMessage("message ID is required")
]