const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    cart: {
        type: [cartSchema],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    admin: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;