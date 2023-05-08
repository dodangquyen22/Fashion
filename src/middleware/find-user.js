const User = require('../app/controller/modulers/User')

const auth = async(req, res, next) => {
    let uid = req.cookies.uid;
    if (!uid) {
        next();
        return;
    }
    try {
        const user = await User.findOne({ _id: uid }).lean()
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        next();
        return;
    }

}
module.exports = auth;