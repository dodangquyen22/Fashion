const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication');
const authenticationMiddleware = require('../middleware/authentication')
const admin_authenticationMiddleware = require('../middleware/admin_authentication')
const authorizationMiddleware = require('../middleware/authorization')
const adminController = require('../app/controller/adminController');
const ProductController = require('../app/controller/productController');
const { route } = require('./user');

router.get('/', adminController.signIn);
router.post('/', adminController.login);
router.get('/homepage', adminController.viewHomepage);
router.get('/account-user', admin_authenticationMiddleware, authorizationMiddleware, adminController.accountUser);
router.get('/viewOrder', admin_authenticationMiddleware, authorizationMiddleware, adminController.viewOrder);
router.get('/products', admin_authenticationMiddleware, authorizationMiddleware, ProductController.viewAll);
router.get('/products/add', admin_authenticationMiddleware, authorizationMiddleware, ProductController.create);
router.post('/products/store', admin_authenticationMiddleware, authorizationMiddleware, ProductController.store);
router.put('/products/:id', admin_authenticationMiddleware, authorizationMiddleware, ProductController.update);
router.get('/products/:id/edit', admin_authenticationMiddleware, authorizationMiddleware, ProductController.edit);
router.delete('/products/delete/:id', admin_authenticationMiddleware, authorizationMiddleware, ProductController.destroy);
module.exports = router;