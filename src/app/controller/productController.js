const Product = require("./modulers/Product");


class ProductController {
    create(req, res, next) {
        res.render('products/create');
    }

    store(req, res, next) {
        //res.json(req.body);
        const product = new Product(req.body);
        product.save();
        res.send('Saved new product');
    }
}

module.exports = new ProductController();