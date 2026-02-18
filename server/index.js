const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS add kiya request block hone se bachane ke liye
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors()); // Ye line Netlify se connection allow karegi
app.use(express.json());

// MongoDB Connection
// Aapke Render Environment mein MONGODB_URI hona zaroori hai
const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas Cloud'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes (Example)
app.get('/', (req, res) => {
    res.send('School Notes API is running...');
});

// Yahan apne baki routes (Auth aur Notes) ko import ya define karein
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});