const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // 1. Check for Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Authentication required',
        code: 'MISSING_AUTH_HEADER'
      });
    }

    // 2. Verify Bearer token format
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Invalid token format',
        code: 'INVALID_TOKEN_FORMAT'
      });
    }

    // 3. Extract and verify token
    const token = authHeader.replace('Bearer ', '').trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'], // Specify allowed algorithms
      ignoreExpiration: false // Explicitly check expiration
    });

    // 4. Validate token payload
    if (!decoded.userId) {
      return res.status(401).json({ 
        error: 'Invalid token payload',
        code: 'INVALID_TOKEN_PAYLOAD'
      });
    }

    // 5. Find user and verify token version (if using token versioning)
    const user = await User.findOne({
      _id: decoded.userId,
      // isActive: true // Uncomment if you have user status flag
    }).select('-password');

    if (!user) {
      return res.status(401).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // 6. Additional checks (optional)
    // - Token version check (if implementing refresh tokens)
    // - IP address verification
    // - Device fingerprint check

    // 7. Attach user to request
    req.user = user;
    req.token = token; // Optional: attach token for logging

    next();
  } catch (err) {
    console.error('Authentication Error:', err.message);

    // Handle specific JWT errors
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        error: 'Invalid token',
        code: 'INVALID_TOKEN'
      });
    }

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        error: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }

    // Generic error response
    res.status(401).json({ 
      error: 'Authentication failed',
      code: 'AUTH_FAILED',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

module.exports = auth;