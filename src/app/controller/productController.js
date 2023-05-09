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
        res.redirect('/admin/products');
    }

    //[GET] /product/:id
    view(req, res, next) {
        Product.findOne({ _id: req.params.id }).lean()
            .then(product => {
                console.log(product)
                res.render('shop-details', {
                    user: req.user,
                    product: product
                });
            })
            .catch(next)
    }

    //[GET] /product/update
    viewAll(req, res, next) {

        let productQuery = Product.find({});


        if (req.query.hasOwnProperty('_sort')) {
            productQuery = productQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        productQuery
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
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/products'))
            .catch(next);
    }

    async search(req, res, next) {
        try {
            const { q } = req.query;
            const query = q ? { name: { $regex: q, $options: 'i' } } : {};
            const products = await Product.find(query).lean();
            res.render('products/search', { user: req.user, query, products });
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /produtc/:id
    destroy(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ProductController();