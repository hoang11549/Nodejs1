const newRouter = require('./news');
const siteRouter= require('./site');
function route(app) {
    // app.get('/new', (req, res) => {
    //     res.render('new');
    // });
    app.get('/news', newRouter);

    app.get('/', siteRouter);
  
}
module.exports = route;
