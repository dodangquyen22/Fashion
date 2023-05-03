const Product = require("./modulers/Product");
const { multipleMongooseToObject } = require('../../utils/mongoose');
const { mongooseToObject } = require('../../utils/mongoose');


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

    //[GET] /product/update
    viewAll(req, res, next) {
        Product.find({})
            .then(products => res.render('products/productUpdate', {
                products: multipleMongooseToObject(products)
            }))
            .catch(next);
        
    }

    // [GET] /product/:id/edit
    edit(req, res, next) {
        Product.findById(req.params.id)
        .then(product => res.render('products/edit', {
            product: mongooseToObject(product)
        }))
        .catch(next);
    }
    // [PUT] /product/:id
    update(req, res, next) {
        Product.updateOne({_id: req.params.id}, req.body)
        .then( () => res.redirect('/product/update'))
        .catch(next);
    }
}

module.exports = new ProductController();