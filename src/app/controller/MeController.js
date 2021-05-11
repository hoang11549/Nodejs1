const Course = require('../model/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/stored-Courses.hbs', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
