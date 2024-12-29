// lib/database.js
const mongoose = require('mongoose');

const connectDb = async () => {
    mongoose.connect("mongodb://localhost:27017/theBridge", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB:', err));
}

module.exports = connectDb;
