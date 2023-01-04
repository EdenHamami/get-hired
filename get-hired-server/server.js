const User = require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
// allow the client to speak to the server 
app.use(cors());
// parse the request body to json
app.use(express.json());
app.use(bodyParser.json());

const port = 3001;
mongoose.set('strictQuery', true);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.find({ username });  
  const userExists = existingUser.length > 0;
  if (userExists) {
    res.sendStatus(403);
  } else {
    const user = new User({ username, password });
    await user.save();
    res.sendStatus(200);  
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

async function connectToDB() {
  const uri = "mongodb+srv://edenHamami:edeham@get-hired-cluster.jfseilf.mongodb.net/?retryWrites=true&w=majority";
  await mongoose.connect(uri);
}

const main = async () => {
  await connectToDB();
  console.log("Established connection to DB");

  // start the server 
  app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
  });    
};

main();

