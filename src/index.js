const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/db');
app.use(express.static(__dirname + '/public'));

const port = 5000;
db.connect();
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'resource/view/index.html'));
});
app.get('/shop.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'resource/view/shop.html'));
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});