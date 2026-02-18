const express = require('express');
const router = express.Router();
const User = require('./models/User');
const Note = require('./models/Note');
const cors = require('cors');

// --- AUTHENTICATION (LOGIN & REGISTER) ---

// Register
router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// --- NOTES OPERATIONS ---

// Create a Note
router.post('/notes', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Error creating note' });
  }
});

// Get Notes
router.get('/notes', async (req, res) => {
  try {
    const role = req.query.role;
    if (role === 'student') {
      const notes = await Note.find({ 
        $or: [ { isShared: true }, { isShared: "true" } ] 
      });
      res.json(notes);
    } else {
      const notes = await Note.find();
      res.json(notes);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes' });
  }
});

// NEW: Update (Edit) a Note
router.put('/notes/:id', async (req, res) => {
  try {
    // This finds the note by ID and updates it with the new data
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Error updating note' });
  }
});

// Delete Note
router.delete('/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting note' });
  }
});

module.exports = router;