const User = require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const compilerServer = require('./server-compiler');

const PracticeProblem = require('./models/practiceProblem');

const app = express();
// allow the client to speak to the server 
app.use(cors());
// parse the request body to json
app.use(express.json());
app.use(bodyParser.json());
compilerServer(app);

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

////////////////////////////////////////////////////////////////

// let question;
// app.post('/question',async (req, res) => {


//   console.log("orpaz");
//   const id = "640cce35298f4827800bf64b"
//   question = await PracticeProblem.findOne({ _id:id }); 
//   const content = question.content
//   res.send(content);
// });


// // post requset to compile
// app.post('/compile', (req, res) => {
  

//   // get the code from the user
//   const { input , languge} = req.body;
//   const { exec } = require('child_process');
//   const fs = require('fs');


//   if (languge == "python"){
//     const test_input = question.test[0].input
//     const test_output = question.test[0].output
//     console.log(test_output);
//   // add the code to the file 
//     fs.writeFileSync('./temp/hellow.py', input, (err) => {
//       if (err) {
//         console.error(err);
//       }
      
//       console.log(stdout);
//       res.send(stdout);
//     });
    
//     compile = 'py ./temp/hellow.py ' + test_input
//     console.log(compile)
//     // compile the code
//     exec(compile , (err, stdout, stderr) => {
//       // delet the file
//       fs.unlink('./temp/hellow.py', (err) => {
//         if (err) {
//           console.error(err);
//         }
//       });
//       if (err) {
//         console.log(err);
//         res.send(stderr);
//         return;
//       }
//       if (test_output[0] == stdout[0]){
//         result_to_user = stdout + '\nYour code is correct'
//       }else{
//         result_to_user = stdout + '\nYour code is incorrect, try again'
//       }
//       res.send(result_to_user);
//     });

// }else if (languge == "C++"){
//   console.log("herrr!!");
//   fs.writeFileSync('./temp/hellow.cpp', input, (err) => {
//     if (err) {
//       console.error(err);
      
//     }
//   });
//   exec('g++ ./temp/hellow.cpp -o ./temp/output.exe && cd temp && output.exe', (err, stdout, stderr) => {
//     // delet the file
//      fs.unlink('./temp/hellow.cpp', (err) => {
//       if (err) {
//         console.error(err);
//       }
//     });
//     fs.unlink('./temp/output.exe', (err) => {
//       if (err) {
//         console.error(err);
//       }
//     });
//     if (err) {
//       console.log(err);
//       res.send(stderr);
//       return;
//     }
//     console.log(stdout);
    
//     res.send(stdout);
    
     
//   });

  
// }
  
// });

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
    // const newUser = new PracticeProblem({
    //     content: 'Write a code for the exercise x+2',
    //     types: ['Algorithms'],
    //     solution: [{language: "python", solution: "def add_two(num):\nresult = num + 2\nreturn result"}, {language: "C++", solution: " "}, {language: "Java", solution: " "}],
    //     main_for_lang: [{language: "python", main: "print(add_num(int(sys.argv[1])))"}, {language: "C++", main: " "}, {language: "Java", main: " "}],
    //     test: [{input: "3", output: "5"}],
    //     difficultyLevel: 1

    // });
    // const user = await newUser.save();
    // console.log('created a new user');
    // console.log(user);
  //start the server 
  app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
  });    
};

main();
