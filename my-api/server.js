require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // ✅ Define 'app' before using it
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // ✅ Enables JSON body parsing
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// **CALL THE FUNCTION TO CONNECT TO DB**
connectDB();

// Routes
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // User CRUD routes

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Protected Route Example
app.get('/api/profile', auth, (req, res) => {
  res.send(req.user);
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
