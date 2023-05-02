const User = require('../app/controller/modulers/User')

const auth = async(req, res, next) => {
    let uid = req.cookies.uid;
    if (!uid) {
        res.redirect("/user/login");
        return;
    }
    try {
        const user = await User.findOne({ _id: uid })
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        res.redirect("/user/login");
        return;
    }

}
module.exports = auth;