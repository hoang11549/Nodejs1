const Course = require('../model/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    storedCourses(req, res, next) {
        //promise
       
        let CourseQuery= Course.find({});
        if(req.query.hasOwnProperty('_sort')){
            const isValidtype= ['asc','desc'].includes(req.query.type);
            CourseQuery= CourseQuery.sort({
                [req.query.column]: isValidtype ? req.query.type :'desc', 
            });
        }
        Promise.all([CourseQuery.find({}), Course.countDocumentsDeleted({})])
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
