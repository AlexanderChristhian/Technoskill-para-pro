const jwt = require('jsonwebtoken');
const { getToken } = require('../utils/redis');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token received in auth middleware:', token.substring(0, 15) + '...');

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded, userId:', decoded.userId);
    
    // Check if token exists in Redis
    const storedToken = await getToken(decoded.userId);
    console.log('Token exists in Redis:', !!storedToken);
    
    if (!storedToken || storedToken !== token) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
