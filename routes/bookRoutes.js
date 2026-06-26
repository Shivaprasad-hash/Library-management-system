const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { bookValidationRules, validate } = require('../validators/validationRules');

const addBook = (req, res) => res.json({ message: "Book data is perfectly validated!" });

router.post('/', protect, authorizeRoles('admin', 'librarian'), bookValidationRules(), validate, addBook);

module.exports = router;