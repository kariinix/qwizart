const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth')

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    
    req.userId = decoded.userId;
    console.log('Authenticated user ID:', req.userId); 
    next();
  });
};