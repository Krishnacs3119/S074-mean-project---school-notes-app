const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Model Import (Dhyan dein: hum ./models/User use kar rahe hain)
const User = require('./models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        // Check agar user pehle se hai
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Password encrypt karna
        const hashedPassword = await bcrypt.hash(password, 10);

        // Naya user banana
        user = new User({
            email,
            password: hashedPassword,
            role: role || 'Student'
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // User dhoondna
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Password match karna
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Token banana
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;