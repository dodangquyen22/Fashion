const User = require('./modulers/User');
const Product = require('./modulers/Product');
const bcrypt = require("bcrypt");

class sign_UpController {
    signUp(req, res) {
        res.render('user/signUp');
    }
    signIn(req, res) {
        res.render('user/signIn');
    }


    loginSuccess(req, res, next) {
        Product.find().lean()
            .then(products => {
                User.findOne({ _id: req.params.id }).lean()
                    .then(users => res.render('user/loginSuccess', { users, products }))
                    .catch(error => next(error));
            })
            .catch(error => next(error));
    }
    async register(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10);
            const { name, email, password } = req.body;
            let plaintext = password.toString();
            const hashed = await bcrypt.hash(plaintext, parseInt(salt));

            const user = await new User({
                name: name,
                email: email,
                password: hashed,
            });

            await user.save();
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                res.status(404).json("Lỗi");
            } else {
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (validPassword) {
                    res.cookie("uid", user.id);
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();
                } else {
                    return res.render('user/signIn', { error: 'Mật khẩu không chính xác' });
                }
            }
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        res.clearCookie("uid");
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
}

module.exports = new sign_UpController();