const Product = require("./modulers/Product");
const Order = require("./modulers/Order");
const request = require('request')

class CheckoutController {
    view(req, res, next) {
        Product.find({
            _id: {
                $in: req.user.cart.map(x => x.product_id)
            }
        }).lean()
            .then(products => {
                products.map(x => {
                    req.user.cart.forEach(y => {
                        if (x._id.toString() == y.product_id.toString()) {
                            x.quantity = y.quantity;
                        }
                    });
                })
                res.render('checkout', {
                    user: req.user,
                    products: products
                })
            })
            .catch(error => next(error));
    }
    async order(req, res, next) {
        let cart = req.user.cart;
        let totalPrice = 0
        let prod_find = await Product.find({
            _id: {
                $in: req.user.cart.map(x => x.product_id)
            }
        }).lean()
        if (!prod_find) {
            throw new Error()
        }
        cart.map(x => {
            prod_find.forEach(y => {
                if (x.product_id.toString() == y._id.toString()) {
                    x.price = parseInt(y.price);
                    totalPrice += x.price * x.quantity;
                }
            })
        })
        console.log(cart)
        let new_order = await new Order({
            customer_id: req.user._id,
            products: cart,
            total: totalPrice
        });
        await new_order.save();
        res.redirect('/');
    }
}

module.exports = new CheckoutController();