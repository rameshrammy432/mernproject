const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).send({ error: 'All fields are required' });
      }
      const user = new User({ firstName, lastName, email, password });
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      console.error(err); // Log error details
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
