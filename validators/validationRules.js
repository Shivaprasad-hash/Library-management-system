const { body, validationResult } = require('express-validator');

//For registering a new user / member
const registerValidationRules = () => {
  return [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('role').optional().isIn(['admin', 'librarian', 'member']).withMessage('Invalid role type.')
  ];
};

//Rules for logging in
const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('password').notEmpty().withMessage('Password is required.')
  ];
};

//Rules for adding or updating a book
const bookValidationRules = () => {
  return [
    body('title').trim().notEmpty().withMessage('Book title is required.'),
    body('author').trim().notEmpty().withMessage('Author name is required.'),
    body('isbn').trim().notEmpty().withMessage('ISBN is required.'),
    body('category').trim().notEmpty().withMessage('Category is required.'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be an integer of at least 1.')
  ];
};

// Middleware wrapper to check if the validation failed
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); //Move to controller.
  }
  
  //To Format the validation errors array
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(400).json({
    success: false,
    errors: extractedErrors
  });
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  bookValidationRules,
  validate
};