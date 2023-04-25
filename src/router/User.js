const express = require('express');
const router = express.Router();
const signUpController = require('../app/controller/UserController');

router.get('/register', signUpController.signUp);
router.get('/login', signUpController.signIn)
router.post('/createUser', signUpController.register);
router.post('/login', signUpController.login)

module.exports = router;