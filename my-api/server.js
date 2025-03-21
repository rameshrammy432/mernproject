require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// ✅ Debug: Check if .env variables are loading
console.log("MongoDB URI:", process.env.MONGO_URI);

// Middleware
app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // ✅ Enable URL-encoded form data

const corsOptions = {
  origin: 'http://localhost:3000', // ✅ Allow React frontend
  credentials: true, // ✅ Allow cookies (for authentication)
};
app.use(cors(corsOptions));

// ✅ Connect MongoDB
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
connectDB();

// Routes
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// ✅ Protected Route Example
app.get('/api/profile', auth, (req, res) => {
  res.send(req.user);
});

// ✅ Handle 404 (Route Not Found)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
