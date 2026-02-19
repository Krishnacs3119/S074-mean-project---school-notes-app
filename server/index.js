const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas Cloud'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('School Notes API is running');
});

// Routes Load Karna
try {
    // Hum seedha 'routes.js' file ko bula rahe hain
    const routes = require('./routes'); 
    app.use('/api', routes);
    console.log("✅ Routes loaded successfully");
} catch (error) {
    console.error("❌ Route Error:", error.message);
}

app.listen(PORT, () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});