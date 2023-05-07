const express = require('express');
const router = express.Router();

const ProductController = require('../app/controller/productController');

router.get('/', ProductController.search)




router.get('/:id', ProductController.view);



module.exports = router;