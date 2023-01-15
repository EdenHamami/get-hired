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

// app.post('/print', async (req, res) => {
//   console.log("orpaz");
//   const { spawn } = require('child_process');
//   const py = spawn('py', ['hellow.py']);

//   py.stdout.on('data', (data) => {
//       console.log(`stdout: ${data}`);
//   });

//   py.stderr.on('data', (data) => {
//       console.error(`stderr: ${data}`);
//   });

//   py.on('close', (code) => {
//       console.log(`child process exited with code ${code}`);
//   });

// });

// post requset to compile
app.post('/compile', (req, res) => {
  console.log("orpaz");

  // get the code from the user
  const { input , languge} = req.body;
  const { exec } = require('child_process');
  const fs = require('fs');

  if (languge == "python"){
  // add the code to the file 
    fs.writeFileSync('./temp/hellow.py', input, (err) => {
      if (err) {
        console.error(err);
      }
      console.log(stdout);
      res.send(stdout);
    });
    
    // compile the code
    exec('py ./temp/hellow.py', (err, stdout, stderr) => {
      // delet the file
      fs.unlink('./temp/hellow.py', (err) => {
        if (err) {
          console.error(err);
        }
      });
      if (err) {
        console.log(err);
        res.send(stderr);
        return;
      }
      console.log(stdout);
      
      res.send(stdout);

      
    });

}else if (languge == "C++"){
  console.log("herrr!!");
  fs.writeFileSync('./temp/hellow.cpp', input, (err) => {
    if (err) {
      console.error(err);
      
    }
  });
  exec('g++ ./temp/hellow.cpp -o ./temp/output.exe && cd temp && output.exe', (err, stdout, stderr) => {
    // delet the file
     fs.unlink('./temp/hellow.cpp', (err) => {
      if (err) {
        console.error(err);
      }
    });
    fs.unlink('./temp/output.exe', (err) => {
      if (err) {
        console.error(err);
      }
    });
    if (err) {
      console.log(err);
      res.send(stderr);
      return;
    }
    console.log(stdout);
    
    res.send(stdout);
    
     
  });

  
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
