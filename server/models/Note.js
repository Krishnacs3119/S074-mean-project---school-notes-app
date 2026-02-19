const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  isShared: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
