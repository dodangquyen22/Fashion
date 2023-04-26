const express = require('express');
const path = require('path');
const app = express();
const { engine } = require('express-handlebars');
const db = require('./config/db');
const morgan = require('morgan');
const route = require('./router');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Template engine
app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

const port = 3000;
db.connect();

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

route(app);