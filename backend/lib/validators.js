import { body, validationResult } from "express-validator";

export const todosValidations = () => {
  return [
    // body("id")
    //   .isNumeric()
    //   .withMessage("ID must be a number")
    //   .notEmpty()
    //   .withMessage("ID is required"),
    body("title").isString().notEmpty().withMessage("Title is required"),
    body("descriptions")
      .optional()
      .isString()
      .withMessage("Descriptions must be a string"),
    body("date")
      .isISO8601()
      .withMessage("Date must be a valid ISO 8601 date")
      .toDate(), // Converts the string to a Date object
    body("category")
      .optional()
      .isString()
      .withMessage("Category must be a string"),
    body("isCompleted")
      .optional()
      .isBoolean()
      .withMessage("isCompleted must be a boolean value"),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
