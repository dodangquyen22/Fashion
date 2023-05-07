const User = require('./modulers/User');
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
                    res.setHeader('Location', '/admin/homepage');
                    res.end();
                } else {
                    return res.render('admin/signIn', { error: 'Mật khẩu không chính xác' });
                }
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new adminController();