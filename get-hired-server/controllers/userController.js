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
      console.log("exist");
    } else {
      const user = new User({ username, password });
      await user.save();
      res.sendStatus(200);
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


};