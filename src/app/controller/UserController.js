const User = require('./modulers/User');
const bcrypt = require("bcrypt");

class sign_UpController {
    signUp(req, res) {
        res.render('user/signUp');
    }
    signIn(req, res) {
        res.render('user/signIn');
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
                    res.status(200).json(user);
                } else {
                    res.status(404).json("Lỗi mật khẩu");
                }
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new sign_UpController();