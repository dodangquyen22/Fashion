const User = require('./modulers/User');
const Product = require('./modulers/Product');

class CartController {
    index(req, res, next) {
        Product.find({
            _id: {
                $in: req.user.cart
            }
        }).lean()
            .then(products => {
                res.render('shopping-cart', { 
                    user: req.user, 
                    products: products 
                })
            })
            .catch(error => next(error));

    }
    addProduct(req, res, next) {
        User.updateOne(
            { _id: req.user._id },
            { $push: { cart: req.params.id } }
        )
        .lean()
        .then(updateResult => {
            if (updateResult.acknowledged) {
                res.redirect(req.headers.referer || "/")
            }
        })
        .catch()
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