const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  isShared: { type: Boolean, default: false }, // If true, students can see it
  createdBy: String // To know which teacher wrote it
});

module.exports = mongoose.model('Note', NoteSchema);