const express = require('express');
const router = express.Router();

const { registerValidationRules, loginValidationRules, validate } = require('../validators/validationRules');


const registerUser = (req, res) => res.json({ message: "Registration passed validation!" });
const loginUser = (req, res) => res.json({ message: "Login passed validation!" });


router.post('/register', registerValidationRules(), validate, registerUser);
router.post('/login', loginValidationRules(), validate, loginUser);

module.exports = router;