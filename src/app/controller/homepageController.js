const Product = require('./modulers/Product');
class homepageController {
    home(req, res, next) {
        Product.find({}).lean()
            .then(products => res.render('index', { products }))
            .catch(error => next(error));
    }
}
module.exports = new homepageController();