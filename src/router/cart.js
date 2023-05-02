const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const cartController = require('../app/controller/CartController');

router.get('/', authMiddleware, cartController.index);
router.get('/add/:id', authMiddleware, cartController.addProduct);
router.get('/remove/:id', authMiddleware, cartController.removeProduct);

module.exports = router;