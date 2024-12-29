const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message : String, // Path to the course image
});

module.exports = mongoose.model('Contact', contactSchema);
