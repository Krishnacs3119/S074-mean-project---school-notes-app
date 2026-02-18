const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. MIDDLEWARE
app.use(cors()); 
app.use(express.json());

// 2. DATABASE CONNECTION (Using your Atlas link)
// Added 'schoolNotes' to the string to name your database
const mongoURI = 'mongodb+srv://krishna:krishnacs3119@cluster0.blhxtqj.mongodb.net/schoolNotes?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas Cloud'))
    .catch(err => console.error('❌ Database connection error:', err));

// 3. SAMPLE ROUTE (Adjust based on your actual routes.js)
const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    role: String,
    date: { type: Date, default: Date.now }
});
const Note = mongoose.model('Note', noteSchema);

app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. START SERVER (Required for Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});