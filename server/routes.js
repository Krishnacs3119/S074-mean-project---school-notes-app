const express = require('express');
const router = express.Router();
const User = require('./models/User');
const Note = require('./models/Note');

// REGISTER
router.post('/register', async (req, res) => {

  const { username, password, role } = req.body;

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: 'User exists' });

  const user = new User({ username, password, role });
  await user.save();

  res.status(201).json({ message: 'Registered' });
});

// LOGIN
router.post('/login', async (req, res) => {

  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  res.json(user);
});

// GET NOTES
router.get('/notes', async (req, res) => {

  const { role, username } = req.query;

  if (role === 'teacher') {
    const notes = await Note.find({ createdBy: username });
    return res.json(notes);
  }

  const notes = await Note.find({ isShared: true });
  res.json(notes);
});

// ADD NOTE
router.post('/notes', async (req, res) => {

  const note = new Note(req.body);
  await note.save();

  res.status(201).json(note);
});

// UPDATE NOTE
router.put('/notes/:id', async (req, res) => {

  await Note.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Updated' });
});

// DELETE NOTE
router.delete('/notes/:id', async (req, res) => {

  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
