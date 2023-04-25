const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, require: true },
    categogy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categogy' }],
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
//export default mongoose.model('Product', productSchema);