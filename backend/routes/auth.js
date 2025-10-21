const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/firebase');

/**
 * Verify authentication token
 * POST /api/auth/verify
 */
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }

    const decodedToken = await verifyToken(token);

    res.status(200).json({
      success: true,
      message: 'Token verified successfully',
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
});

/**
 * Get current user info
 * GET /api/auth/me
 */
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided'
      });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyToken(token);

    res.status(200).json({
      success: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
});

/**
 * Health check for authentication service
 * GET /api/auth/health
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authentication service is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
