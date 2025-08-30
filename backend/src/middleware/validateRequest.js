import { validationResult } from "express-validator";

export default (req, res, next) => {
  console.log("now in request validator");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};
