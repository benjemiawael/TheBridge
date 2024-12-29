const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }  // Ajoutez un rôle par défaut
});

module.exports = mongoose.model('User', userSchema);
