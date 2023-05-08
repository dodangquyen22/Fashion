const express = require('express');
const router = express.Router();
const shopController = require('../app/controller/ShopController');

router.get('/', shopController.index);
router.get('/product', shopController.search);
// router.get('/home', shopController.home);
// router.get('/shop', shopController.shop);
router.get('/filter', shopController.filter);
router.get('/sort', shopController.sort);

module.exports = router;