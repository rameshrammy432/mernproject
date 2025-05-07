const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Log all requests
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Create User
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('age', 'Age must be a number').optional().isNumeric(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let { name, email, age, password } = req.body;

      // Check for existing user
      if (await User.findOne({ email })) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create new user
      const user = new User({
        name,
        email,
        age,
        password: await bcrypt.hash(password, 10)
      });

      await user.save();

      // Return user without password
      const userResponse = user.toObject();
      delete userResponse.password;
      
      res.status(201).json(userResponse);

    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ 
        error: 'Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
);

// Get All Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password -__v');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get Single User
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -__v');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// Update User
router.put('/:id', async (req, res) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.age) updates.age = req.body.age;
    
    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;