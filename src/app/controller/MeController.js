const Course = require('../model/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    storedCourses(req, res, next) {
        //promise
        Promise.all([Course.find({}), Course.countDocumentsDeleted({})])
            .then(([courses, deleteCount])=> res.render('me/stored-Courses.hbs', {
                deleteCount,
                courses: mutipleMongooseToObject(courses),
            })
            )
            .catch(next);
      
    }

    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-Courses.hbs', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
