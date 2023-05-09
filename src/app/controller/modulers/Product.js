const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    image: { type: String, require: true },
    category: { type: String, require: true},
    stock: {type: Number, require: true }
    
}, {
    versionKey: false,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
//export default mongoose.model('Product', productSchema);