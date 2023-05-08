const user = require('./user');
const homepage = require('./homepage');
const product = require('./product');
const cart = require('./cart')
const admin = require('./admin');
const shop = require('./shop');

function route(app) {
    app.use('/', homepage);
    app.use('/user', user);
    app.use('/product', product);
    app.use('/cart', cart);
    app.use('/admin', admin);
    app.use('/shop', shop);
}

module.exports = route;