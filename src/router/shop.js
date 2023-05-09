const express = require('express');
const router = express.Router();
const shopController = require('../app/controller/ShopController');

router.get('/', shopController.index);
router.get('/product', shopController.search);
router.get('/filter-and-sort', shopController.filter_sort);

module.exports = router;