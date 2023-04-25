const signUp = require('./User');

function route(app) {
    app.use('/user', signUp);
}

module.exports = route;