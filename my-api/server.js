const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const uri = 'mongodb+srv://rameshkondru17:ep1oGgbu1OtuA5AT@cluster0.0lcvahr.mongodb.net/mydatabase?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Example of a protected route
app.get('/api/profile', auth, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
