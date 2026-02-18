const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // This is the key to fixing your problem
const routes = require('./routes'); 

const app = express();

// --- SECURITY SETTINGS (CORS) ---
// This tells the browser: "It is okay to accept data from this server"
app.use(cors()); 
app.use(express.json());

// Log every request so we can see what's happening
app.use((req, res, next) => {
  console.log(`📡 Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/schoolNotes')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Could not connect to MongoDB', err));

// Connect our Routes
app.use('/api', routes);

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`🔓 CORS Security is ENABLED (Browser should accept data now)`);
});