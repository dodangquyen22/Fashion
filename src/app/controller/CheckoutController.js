const Product = require("./modulers/Product");
const Order = require("./modulers/Order");

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
        let cart1 = req.user.cart;
        let cart2 = req.user.cart;
        let totalPrice = cart1.reduce((partialSum, a) => partialSum + parseInt(a.price) * a.quantity, 0);
        console.log(totalPrice)
        let new_order = await new Order({
            customer_id: req.user._id,
            products: cart2.map(x => x.price = parseInt(x.price)),
            total: totalPrice
        });
        await new_order.save();
        res.redirect('/');
    }
}

module.exports = new CheckoutController();