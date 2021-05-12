const express = require('express');
const router = express.Router();
const courseController = require('../app/controller/CourseController');

router.get('/create', courseController.create);

router.post('/create', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-action', courseController.handleformAction)
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forcedestroy);
router.get('/:slug', courseController.show);

module.exports = router;
