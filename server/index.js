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
    .then(() => console.log('Connected to MongoDB Atlas Cloud'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('School Notes API is running');
});

try {
    // Aapke folder structure mein 'routes.js' seedha server folder mein hai
    const routes = require('./routes');
    app.use('/api', routes);
} catch (error) {
    console.error("Error loading routes:", error.message);
}

app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});