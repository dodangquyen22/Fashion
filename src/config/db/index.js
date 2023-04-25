const mongoose = require('mongoose');
async function connect() {

    mongoose.connect('mongodb://localhost:27017/Fashion')
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB', error);
        });
}

module.exports = { connect };