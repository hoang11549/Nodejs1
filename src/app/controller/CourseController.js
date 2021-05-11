const Course = require('../model/Course');
const { MongooseToObject } = require('../../util/mongoose');

class CourseController {
   // course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => 
                res.render('courses/show', {course: MongooseToObject(course)})
            )
            .catch(next);
    }
// Get for show create page
    create(req, res,next) {
        res.render('courses/create')
    }
    // POST store add course on db
    store(req, res,next) {
        const formData = req.body;
        formData.image='https://img.youtube.com/vi/'+req.body.videoId+'/sddefault.jpg';
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/'))
            .catch(error=>{

            });


     
    }
}

module.exports = new CourseController();