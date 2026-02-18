const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'student'], required: true } // Only 'teacher' or 'student' allowed
});

module.exports = mongoose.model('User', UserSchema);