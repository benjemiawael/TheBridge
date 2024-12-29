const Course = require('../models/courses'); // Import Course model
const Contact = require('../models/contact');
// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const newCourse = new Course({
      title: req.body.title,
      price: req.body.price,
      imgsrc: req.file ? `http://localhost:3000/uploads/courses/${req.file.filename}` : null,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    // Check if a file (image) is provided, otherwise keep the current image URL
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        price: req.body.price,
        imgsrc: req.file ? `http://localhost:3000/uploads/courses/${req.file.filename}` : req.body.imgsrc,
      },
      { new: true } // Return the updated course
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Return updated course data
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};

// Get a course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
  }
};

exports.sendnotification = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new contact entry
    const contact = new Contact({
      name,
      email,
      message,
    });

    // Save the contact to the database
    await contact.save();

    // Respond with a success message
    res.status(201).json({ message: 'Notification sent successfully', contact });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};