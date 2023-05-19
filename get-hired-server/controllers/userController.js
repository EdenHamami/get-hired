const User = require('../models/user');

module.exports = function configureServer(app) {
  app.post('/register', async (req, res) => {
    console.log("post");
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
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });


};