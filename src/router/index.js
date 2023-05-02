const signUp = require('./user');
const homepage = require('./homepage');
const product = require('./product');

function route(app) {
    app.use('/', homepage);
    app.use('/user', signUp);
    app.use('/product', product);
}

module.exports = route;