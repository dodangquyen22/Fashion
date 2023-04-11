const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }
});

const User = mongoose.model('User', userSchema);
// User.createCollection().then(function(collection) {
//     console.log('Collection is created!');
// });

module.exports = User;