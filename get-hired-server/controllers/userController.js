const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'abcde12345eauofn213-e3i9rfnwjfwf';
// Generate a new token with an expiration time (e.g., 1 hour)
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, secretKey);
  return token;
};


module.exports = function configureServer(app) {
  app.post('/register', async (req, res) => {
    
    const { username, password } = req.body;
    const existingUser = await User.find({ username });
    const userExists = existingUser.length > 0;
    if (userExists) {
      res.sendStatus(403);
    } else {
      const user = new User({ username, password });
      await user.save();
      const token = generateToken(user);
      res.status(200).json({ token });
      console.log("200");

    }
  });

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.find({ username });
    if (user.length > 0 && user[0].password == password) {
      const token = generateToken(user);
      res.status(200).json({ token });
    } else {
      res.sendStatus(401);
    }
  });

  
  app.post('/logout', async (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
  });


  app.post('/user_name', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      console.log('No token provided')
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(token)
      console.log('Failed to authenticate token')
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    try{
      var user_name = decoded.userId[0].username
      } catch{
     
        var user_name = decoded.userId.username
      }
  
    return res.status(200).json({ user_name });
   
  });
  });

};