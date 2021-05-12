const Course = require('../model/Course');
const { MongooseToObject } = require('../../util/mongoose');

class CourseController {
    // course/:slug
    show(req, res, next) {
        
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/show', {
                    course: MongooseToObject(course),
                }),
            )
            .catch(next);
    }
    // Get for show create page
    create(req, res, next) {
        res.render('courses/create');
    }
    // POST store add course on db
    store(req, res, next) {
        
        req.body.image =
            'https://img.youtube.com/vi/' + req.body.videoId + '/sddefault.jpg';
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => {});
    }
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: MongooseToObject(course),
                }),
            )
            .catch(next);
    }
    //[Put] edit
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //PAtch
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    forcedestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController();
