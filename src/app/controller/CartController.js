const User = require('./modulers/User');
const Product = require('./modulers/Product');
const { update } = require('./productController');

class CartController {
    index(req, res, next) {
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
                res.render('shopping-cart', {
                    user: req.user,
                    products: products
                })
            })
            .catch(error => next(error));

    }
    addProduct(req, res, next) {
        User.updateOne(
            {
                _id: req.user._id,
                cart: {
                    $elemMatch: {
                        product_id: req.params.id
                    }
                }
            },
            { $inc: { "cart.$.quantity": 1 } }
        )
            .lean()
            .then(updateResult => {
                if (updateResult.acknowledged && updateResult.modifiedCount == 1) {
                    res.redirect(req.headers.referer || "/")
                } else if (updateResult.modifiedCount == 0) {
                    User.updateOne(
                        {
                            _id: req.user._id
                        },
                        {
                            $push: {
                                cart: {
                                    product_id: req.params.id,
                                    quantity: 1
                                }
                            }
                        }
                    )
                        .lean()
                        .then(updateResult => {
                            if (updateResult.acknowledged && updateResult.modifiedCount == 1) {
                                res.redirect(req.headers.referer || "/")
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            console.log("Something went wrong!")
                        })
                }
            })
            .catch(err => {
                console.log(err)
                console.log("Something went wrong!")
            })
    }
    removeProduct(req, res, next) {
        User.updateOne(
            { _id: req.user._id },
            { $pull: { cart: req.params.id } }
        )
            .lean()
            .then(updateResult => {
                console.log(updateResult)
                if (updateResult.acknowledged) {
                    res.redirect(req.headers.referer || "/")
                }
            })
            .catch()
    }
}

module.exports = new CartController();