const express = require('express');
const path = require('path');
const coursesController = require('../controllers/courses');
const upload = require('../middlewares/uploadImages');
const router = express.Router();

// Serve static files (images) from the 'uploads/courses' directory
router.use('/uploads/courses', express.static(path.join(__dirname, '..', 'uploads', 'courses')));

// Route for creating a new course
router.post('/courses', upload, coursesController.createCourse);

// Route for getting all courses
router.get('/courses', coursesController.getAllCourses);

// Route for getting a course by ID
router.get('/courses/:id', coursesController.getCourseById);

// Route for updating a course by ID with image upload
router.put('/courses/:id', upload, coursesController.updateCourse);

// Route for deleting a course by ID
router.delete('/courses/:id', coursesController.deleteCourse);

router.post('/contact' , coursesController.sendnotification);

module.exports = router;
