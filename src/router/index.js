const signUp = require('./user');
const homepage = require('./homepage');
const product = require('./product');
const cart = require('./cart')

function route(app) {
    app.use('/', homepage);
    app.use('/user', signUp);
    app.use('/product', product);
    app.use('/cart', cart);
}

module.exports = route;