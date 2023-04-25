const express = require('express');
const path = require('path');
const app = express();
const { engine } = require('express-handlebars');
const db = require('./config/db');
const morgan = require('morgan');
const route = require('./router');
const bodyParser = require('body-parser');
// const User = require('./app/controller/modulers/User');
// const Role = require('./app/controller/modulers/Role');
// const Product = require('./app/controller/modulers/Product');
// const Category = require('./app/controller/modulers/Categogy');
// const Order = require('./app/controller/modulers/Order');
// const wishlist = require('./app/controller/modulers/WishList');

app.use(express.static(__dirname + '/public'));
app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Template engine
app.engine('handlebars', engine());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

const port = 3000;
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

// app.get('/', function(req, res) {
//     // res.sendFile(path.join(__dirname, 'resource/view/index.html'));
//     res.render('index');
// });
app.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname, 'resources/views/index.html'));
    res.render('index');
});
app.get('/shop.html', function(req, res) {
    //res.sendFile(path.join(__dirname, 'resources/views/shop.html'));
    res.render('shop');
});
app.get('/shop-details.html', function(req, res) {
    //res.sendFile(path.join(__dirname, 'resources/views/shop-details.html'));
    res.render('shop-details');
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

route(app);