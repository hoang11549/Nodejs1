const path = require('path');
const express = require('express');
var morgan = require('morgan');
const methodOverride = require('method-override');
var handlebars = require('express-handlebars');
//connectDB
const db = require('./config/db/index');
db.connect();

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sortMiddlewares = require('./app/middlewares/sortMiddlewares');
const route = require('./routes');
//HTTP logger
app.use(morgan('combined'));
app.use(methodOverride('_method'));

// cusstom middleware
app.use(sortMiddlewares);
//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable:(field,sort)=>{
                const sortType = field === sort.column? sort.type: 'default';
                const icons={
                    default:'fas fa-sort',
                    asc: 'fas fa-sort-amount-down-alt',
                    desc: 'fas fa-sort-amount-up-alt',
                };
                const types ={
                    defaut:'default',
                    asc:'desc',
                    desc:'asc',
                };
                const icon = icons[sortType];
                const type = types[sort.type];
                return '  <a href="?_sort&column='+field+'&type='+type+'"><i class="'+icon+'"></i></a>';

            }
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

//route init
route(app);

app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`);
});
