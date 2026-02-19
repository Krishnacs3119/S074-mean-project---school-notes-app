const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas Cloud'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('School Notes API is running');
});

// Routes Section
try {
    // 👇 Yahan maine 'auth' ko 'user' kar diya hai
    const authRoutes = require('./routes/user'); 
    const noteRoutes = require('./routes/notes');

    app.use('/api', authRoutes);
    app.use('/api/notes', noteRoutes);
    console.log("✅ Routes loaded successfully");
} catch (error) {
    console.error("❌ Route Error:", error.message);
}

app.listen(PORT, () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});