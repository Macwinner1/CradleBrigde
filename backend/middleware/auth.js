const { verifyToken } = require('../config/firebase');

/**
 * Middleware to verify Firebase authentication token
 * Protects admin routes from unauthorized access
 */
const authenticateUser = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided'
      });
    }

    const token = authHeader.split('Bearer ')[1];

    // Verify the token
    const decodedToken = await verifyToken(token);
    
    // Attach user info to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token'
    });
  }
};

/**
 * Optional auth middleware - doesn't block if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await verifyToken(token);
      
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
      };
    }
    
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

module.exports = {
  authenticateUser,
  optionalAuth,
};
