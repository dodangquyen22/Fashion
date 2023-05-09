const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication');
const CheckoutController = require('../app/controller/CheckoutController');

router.get('/', authMiddleware, CheckoutController.view)
router.post('/', authMiddleware, CheckoutController.order)


module.exports = router;