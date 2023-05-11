const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication');
const authenticationMiddleware = require('../middleware/authentication')
const authorizationMiddleware = require('../middleware/authorization')
const adminController = require('../app/controller/adminController');
const ProductController = require('../app/controller/productController');
const { route } = require('./user');

router.get('/', adminController.signIn);
router.post('/', adminController.login);
router.get('/homepage', adminController.viewHomepage);
router.get('/account-user', authenticationMiddleware, authorizationMiddleware, adminController.accountUser);
router.get('/viewOrder', authenticationMiddleware, authorizationMiddleware, adminController.viewOrder);
router.get('/products', authenticationMiddleware, authorizationMiddleware, ProductController.viewAll);
router.get('/products/add', authenticationMiddleware, authorizationMiddleware, ProductController.create);
router.post('/products/store', authenticationMiddleware, authorizationMiddleware, ProductController.store);
router.put('/products/:id', authenticationMiddleware, authorizationMiddleware, ProductController.update);
router.get('/products/:id/edit', authenticationMiddleware, authorizationMiddleware, ProductController.edit);
router.delete('/products/delete/:id', authenticationMiddleware, authorizationMiddleware, ProductController.destroy);
module.exports = router;