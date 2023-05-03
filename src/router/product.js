const express = require('express');
const router = express.Router();
const ProductController = require('../app/controller/productController');

router.get('/create', ProductController.create);
router.post('/store', ProductController.store);
router.get('/update', ProductController.viewAll);
router.get('/:id/edit', ProductController.edit);
router.put('/:id', ProductController.update);

module.exports = router;