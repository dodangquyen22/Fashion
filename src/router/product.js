const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middleware/authentication')
const authorizationMiddleware = require('../middleware/authorization')
const ProductController = require('../app/controller/productController');

router.get('/create',authenticationMiddleware, authorizationMiddleware,  ProductController.create);
router.post('/store',authenticationMiddleware, authorizationMiddleware, ProductController.store);
router.get('/update',authenticationMiddleware, authorizationMiddleware, ProductController.viewAll);
router.get('/:id/edit',authenticationMiddleware, authorizationMiddleware, ProductController.edit);
router.get('/:id', ProductController.view);
router.put('/:id',authenticationMiddleware, authorizationMiddleware, ProductController.update);
router.delete('/:id',authenticationMiddleware, authorizationMiddleware, ProductController.destroy);

module.exports = router;