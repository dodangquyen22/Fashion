const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    image: { type: String, require: true },
    category: { type: String, require: true},
    
}, {
    versionKey: false,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
//export default mongoose.model('Product', productSchema);