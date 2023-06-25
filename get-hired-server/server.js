
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const compilerServer = require('./controllers/compilerController');
const personalqServer = require('./controllers/personalqController');
const jobsController = require('./controllers/jobController')
const userController = require('./controllers/userController')
const openaiController = require('./controllers/openaiController')
const interviewController = require('./controllers/interviewController')
const cvController = require('./controllers/cvController')

const app = express();
// allow the client to speak to the server 
app.use(cors());
// parse the request body to json
app.use(express.json());
app.use(bodyParser.json());
compilerServer(app);
personalqServer(app);
userController(app);
jobsController(app);
interviewController(app);
openaiController(app);
cvController(app);
const port = 3001;
mongoose.set('strictQuery', true);

async function connectToDB() {
  const uri = "mongodb+srv://edenHamami:edeham@get-hired-cluster.jfseilf.mongodb.net/?retryWrites=true&w=majority";
  await mongoose.connect(uri);
}

const main = async () => {
  await connectToDB();
  console.log("Established connection to DB");
  //start the server 
  app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
  });    
};





main();
