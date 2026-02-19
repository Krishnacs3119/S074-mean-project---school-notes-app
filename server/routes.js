const express = require('express');
const router = express.Router();
const Note = require('./models/Note');
const User = require('./models/User');

/* =========================
   REGISTER
========================= */
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Registration error" });
  }
});

/* =========================
   LOGIN
========================= */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      email: user.email,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
});

/* =========================
   GET NOTES (ROLE BASED)
========================= */
router.get('/notes', async (req, res) => {
  try {
    const { role, email } = req.query;

    let notes;

    if (role === 'teacher') {
      notes = await Note.find({ createdBy: email });
    } else {
      notes = await Note.find({ isShared: true });
    }

    res.json(notes);

  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

/* =========================
   CREATE NOTE
========================= */
router.post('/notes', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);

  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
});

/* =========================
   UPDATE NOTE
========================= */
router.put('/notes/:id', async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
