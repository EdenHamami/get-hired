const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'abcde12345eauofn213-e3i9rfnwjfwf';


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
  
      req.userId = decoded.userId;
      console.log(userId)
      next();
    });
  };