const User = require('./modulers/User');
const Order = require('./modulers/Order');
const bcrypt = require("bcrypt");

class adminController {
    viewHomepage(req, res) {
        res.render('admin/homepage');
    }
    signIn(req, res) {
        res.render('admin/signIn');
    }
    async login(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user || !user.admin) {
                return res.render('admin/signIn', { error: 'Tài khoản không tồn tại' });
            } else {
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (validPassword) {
                    res.cookie("uid", user.id);
                    res.statusCode = 302;
                    res.setHeader('Location', '/admin/products');
                    res.end();
                } else {
                    return res.render('admin/signIn', { error: 'Mật khẩu không chính xác' });
                }
            }
        } catch (error) {
            next(error);
        }
    }
    accountUser(req, res, next) {
        Order.find({}).populate("customer_id").lean()
            .then(orders => {
                console.log(orders)
                res.render('admin/account-user', { orders })
            })
            .catch(error => next(error));
    }
    viewOrder(req, res, next) {
        Order.findOne({
            _id: req.query.id
        }).populate("customer_id").populate({
            path: "products.product_id",
            // select: "product_id"
        }).lean()
        .then(order => {
            console.log(order.products)
            res.render('admin/viewOrder', { order })
        })
        .catch(error => next(error));
    }
}

module.exports = new adminController();