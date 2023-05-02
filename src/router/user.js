const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const signUpController = require('../app/controller/UserController');

router.get('/register', signUpController.signUp);
router.get('/login', signUpController.signIn)
router.post('/createUser', signUpController.register);
router.post('/login', signUpController.login)
router.get('/logout', signUpController.logout)
router.get('/:id', authMiddleware, signUpController.loginSuccess);

module.exports = router;