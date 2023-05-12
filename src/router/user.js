const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication');
const signUpController = require('../app/controller/UserController');

router.get('/register', signUpController.signUp);
router.get('/login', signUpController.signIn);
router.post('/createUser', signUpController.register);
router.post('/login', signUpController.login);
router.get('/logout', signUpController.logout);
router.get('/info', authMiddleware, signUpController.info);
router.post('/change-info', authMiddleware, signUpController.change_Info)
router.get('/purchase', authMiddleware, signUpController.showPurchase);
router.get('/:id', authMiddleware, signUpController.loginSuccess);


module.exports = router;