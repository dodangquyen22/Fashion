const Product = require('./modulers/Product');
const User = require('./modulers/User');
class homepageController {
    home(req, res, next) {
        let uid = req.cookies.uid;
        if (!uid) {
            Product.find({}).lean()
            .then(products => res.render('index', { products }))
            .catch(error => next(error));
        }
        console.log("UID: ", uid);
        let userFindResult = User.findOne({ _id: uid }).lean().then (users => {
                Product.find().lean()
                .then(products => {
                    res.render('user/loginSuccess', { users, products })
                })
                .catch(error => next(error));
            }
        )
        .catch(err => {
            console.log("Error when find user");
            Product.find({}).lean()
            .then(products => res.render('index', { products }))
            .catch(error => next(error));
        });

    }
}
module.exports = new homepageController();