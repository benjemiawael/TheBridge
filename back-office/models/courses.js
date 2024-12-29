const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  imgsrc: String, // Path to the course image
});

module.exports = mongoose.model('Course', CourseSchema);
