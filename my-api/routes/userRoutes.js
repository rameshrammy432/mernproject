const express = require('express');
const bcrypt = require('bcryptjs');  // For password hashing
const { check, validationResult } = require('express-validator'); // For input validation
const User = require('../models/User');

const router = express.Router();

/**
 * @route   POST /users
 * @desc    Create a new user
 * @access  Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('age', 'Age must be a number').optional().isNumeric(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let { name, email, age, password } = req.body;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      user = new User({ name, email, age, password });
      await user.save();

      res.status(201).json(user);
    } catch (err) {
      console.error('Server Error:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from response
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /users/:id
 * @desc    Get a single user by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   PUT /users/:id
 * @desc    Update a user by ID
 * @access  Public
 */
router.put('/:id', async (req, res) => {
  try {
    const { name, email, age, password } = req.body;
    const updateData = { name, email, age };

    // If password is provided, hash it before updating
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @route   DELETE /users/:id
 * @desc    Delete a user by ID
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
