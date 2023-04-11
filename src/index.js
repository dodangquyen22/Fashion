const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/db');
// const User = require('./app/controller/modulers/User');
// const Role = require('./app/controller/modulers/Role');
// const Product = require('./app/controller/modulers/Product');
// const Category = require('./app/controller/modulers/Categogy');
// const Order = require('./app/controller/modulers/Order');
// const wishlist = require('./app/controller/modulers/WishList');
app.use(express.static(__dirname + '/public'));

const port = 5000;
db.connect();

// User.createCollection().then(function(collection) {
//     console.log('Collection User is created!');
// });

// Role.createCollection().then(function(collection) {
//     console.log('Collection Role is created!');
// });

// Product.createCollection().then(function(collection) {
//     console.log('Collection Product is created!');
// });

// Category.createCollection().then(function(collection) {
//     console.log('Collection Category is created!');
// });

// Order.createCollection().then(function(collection) {
//     console.log('Collection Order is created!');
// });
// wishlist.createCollection().then(function(collection) {
//     console.log('Collection Wishlist is created!');
// });

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'resource/view/index.html'));
});
app.get('/shop.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'resource/view/shop.html'));
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});