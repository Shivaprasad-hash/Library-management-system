const express = require('express');
const router = express.Router();
const { param } = require('express-validator'); // Import param validator
const { validate } = require('../validators/validationRules');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Mock controllers
const getMemberById = (req, res) => res.json({ message: "Fetched member document" });

// Add a check to ensure the incoming :id parameter is a true MongoDB HexString ObjectId
router.get('/:id', 
  protect, 
  authorizeRoles('admin', 'librarian'),
  param('id').isMongoId().withMessage('Invalid Member ID format'), 
  validate, 
  getMemberById
);

module.exports = router;