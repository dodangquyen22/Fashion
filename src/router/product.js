const express = require('express');
const router = express.Router();
const ProductController = require('../app/controller/productController');

router.get('/create', ProductController.create);
router.post('/store', ProductController.store);

module.exports = router;