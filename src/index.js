const express = require('express');
const path = require('path');
const app = express();
const { create } = require('express-handlebars');
const db = require('./config/db');
const morgan = require('morgan');
const route = require('./router');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

var hbs = create({
    extname: '.hbs',
    helpers: require('./utils/HBSHelper')
});

//Template engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

const port = 3000;
db.connect();

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

route(app);