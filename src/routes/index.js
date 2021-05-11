const newRouter = require('./news');
const courseRouter = require('./courses');
const siteRouter = require('./site');
function route(app) {
    // app.get('/new', (req, res) => {
    //     res.render('new');
    // });

    app.use('/news', newRouter);
    app.use('/courses',courseRouter)
    app.use('/', siteRouter);
}
module.exports = route;
