const user_finder = require("../middleware/find-user");
const user = require('./user');
const homepage = require('./homepage');
const product = require('./product');
const cart = require('./cart')
const admin = require('./admin');

function route(app) {
    // Find user middleware
    app.use(user_finder);

    app.use('/', homepage);
    app.use('/user', user);
    app.use('/product', product);
    app.use('/cart', cart);
    app.use('/admin', admin);
}

module.exports = route;