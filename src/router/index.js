const signUp = require('./user');
const homepage = require('./homepage');

function route(app) {
    app.use('/', homepage);
    app.use('/user', signUp);
}

module.exports = route;