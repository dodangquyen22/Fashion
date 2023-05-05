const express = require('express');
const router = express.Router();
const ProductController = require('../app/controller/productController');

router.get('/create', ProductController.create);
router.post('/store', ProductController.store);
router.get('/update', ProductController.viewAll);
router.get('/:id/edit', ProductController.edit);
router.get('/:id', ProductController.view);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.destroy);

module.exports = router;