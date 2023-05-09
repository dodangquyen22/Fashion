const Product = require('./modulers/Product');
const User = require('./modulers/User');

class ShopController {
    index(req, res, next) {
        let uid = req.cookies.uid;
        if (!uid) {
            Product.find({}).lean()
                .then(products => res.render('shop', { products }))
                .catch(error => next(error));
        }
        let userFindResult = User.findOne({ _id: uid }).lean().then(user => {
                Product.find().lean()
                    .then(products => {
                        res.render('shop', {
                            user,
                            products
                        })
                    })
                    .catch(error => next(error));
            })
            .catch(err => {
                console.log("Error when find user");
                Product.find({}).lean()
                    .then(products => res.render('shop', { products }))
                    .catch(error => next(error));
            });
    }
    async filter_sort(req, res, next) {
        try {
            const category = req.query.category;
            const sort = req.query.sort;
            const query = {};
            if (category) {
                query.category = category;
            }
            let products = await Product.find(query).lean();
            if (sort === "asc") {
                products = products.sort((a, b) => parseInt(a.price) - parseInt(b.price));
            }
            if (sort === "desc") {
                products = products.sort((a, b) => parseInt(b.price) - parseInt(a.price));
            }
            res.render('shop/filter_sort', { user: req.user, query, products });
        } catch (error) {
            next(error);
        }
    }
    async search(req, res, next) {
        try {
            const { q } = req.query;
            const query = q ? { name: { $regex: q, $options: 'i' } } : {};
            const products = await Product.find(query).lean();
            res.render('shop/search', { user: req.user, query, products });
        } catch (error) {
            next(error);
        }
    }

    // async sort(req, res, next) {
    //     try {
    //         const sort = req.query.sort;
    //         const query = {};
    //         let products = await Product.find(query).lean();
    //         if (sort === "asc") {
    //             products = products.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    //         }
    //         if (sort === "desc") {
    //             products = products.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    //         }
    //         res.render('shop/sort', { products });
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}
module.exports = new ShopController();