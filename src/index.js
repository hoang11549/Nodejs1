const path = require('path');
const express = require('express');
var morgan = require('morgan');
var handlebars = require('express-handlebars');
//connectDB
const db = require('./config/db/index');
db.connect();

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const route = require('./routes');
//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

//route init
route(app);

app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`);
});
