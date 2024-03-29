const Vacancy = require('./models/vacancy');
const User = require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const compilerServer = require('./server-compiler');
const personalqServer = require('./server-personalq');

const PracticeProblem = require('./models/practiceProblem');
const PersonalProblem = require('./models/personalProblem');

const app = express();
// allow the client to speak to the server 
app.use(cors());
// parse the request body to json
app.use(express.json());
app.use(bodyParser.json());
compilerServer(app);
personalqServer(app);

const port = 3001;
mongoose.set('strictQuery', true);


app.post('/jobSearch', async (req, res) => {

  const { jobdescription, joblocation } = req.body;
  const SerpApi = require('google-search-results-nodejs');
  const query = jobdescription.toString() + ' ' + joblocation.toString()
  console.log(query);
  const search = new SerpApi.GoogleSearch("407730da12c009e6c976a0b294a56048619e1e788b76bad9178e3a8fb34a892b");
  
  const params = {
    engine: "google_jobs",
    q: query,
    hl: "en"
  };
  
  const callback = function(data) {
    const jsonContent = JSON.stringify(data["jobs_results"]);
    res.end(jsonContent);
    
   
  };
   // Show result as JSON
    search.json(params, callback);
  // res.end(search.json(params, callback));
//   const uniqueNames = await Vacancy.distinct('job_id');
//   await Vacancy.deleteMany({
//     name: { $nin: uniqueNames }
// });
  // const jobs = Vacancy.find({title: jobdescription.toString(),location: joblocation.toString()});
  // const jsonContent = JSON.stringify(jobs);
  // console.log(jsonContent);
  // res.end(jsonContent);
});



app.post('/saveJob', async (req, res) => {
  
  const { username, password, job } = req.body;
  var user =  await User.findOne({username: username.toString()});
  user.interestedVacancies.push(job);
  //console.log(job)
  await user.save();
  res.send('Job saved successfully!');
});

app.post('/getSavedJobs', async (req, res) => {
  console.log("post");
  const { username } = req.body;

  // User.findOne({ username: username.toString() })
  // .populate({
  //   path: 'interestedVacancies.vacancy',
  //   model: 'Vacancy'
  // })
  // .exec((err, user) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }

  //   if (!user) {
  //     console.log('User not found');
  //     return;
  //   }

  //   // get the actual vacancies from the user's interestedVacancies array
  //   const vacancies = user.interestedVacancies.map(iv => iv.vacancy);

  //   // convert each vacancy object to a JSON object
  //   const vacancyJsonArray = vacancies.map(vacancy => vacancy.toJSON());

  //   console.log(vacancyJsonArray); // do something with the JSON object array
  // });

  var user =  await User.findOne({username: username.toString()});
  var jobs = user.interestedVacancies
  var vacancies = user.interestedVacancies.map(vacancy => vacancy.vacancy)
  var jsonContent = JSON.stringify(vacancies);
  const vacancyJsonArray = vacancies.map(vacancy => vacancy.toJSON());
  console.log(vacancyJsonArray)
  res.send(jsonContent)
});

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
//     fs.writeFileSync('./temp/solution.py', input, (err) => {
//       if (err) {
//         console.error(err);
//       }
      
//       console.log(stdout);
//       res.send(stdout);
//     });
    
//     compile = 'py ./temp/solution.py ' + test_input
//     console.log(compile)
//     // compile the code
//     exec(compile , (err, stdout, stderr) => {
//       // delet the file
//       fs.unlink('./temp/solution.py', (err) => {
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
//   fs.writeFileSync('./temp/solution.cpp', input, (err) => {
//     if (err) {
//       console.error(err);
      
//     }
//   });
//   exec('g++ ./temp/solution.cpp -o ./temp/output.exe && cd temp && output.exe', (err, stdout, stderr) => {
//     // delet the file
//      fs.unlink('./temp/solution.cpp', (err) => {
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
    //     title: ' ',
    //     content: ' ',
    //     examples: [{input: " herrr", output: " "}],
    //     types: ["63adea0ef1e5056c8119ae60"],
    //     hints: [{name: " ", content: " "}],
    //     python: {header:" ", solution: " ", main: " ", initial_code: " "},
    //     cpp: {header:" ", solution: " ", main: " ", initial_code: " "},
    //     java: {header:" ", solution: " ", main: " ", initial_code: " "},
    //     test: [{input: " ", output: " "}],
    //     difficultyLevel: "medium"

    // });
    // const user = await newUser.save();
    // console.log('created a new user');
    // console.log(user);

  // const personalProblem = new PersonalProblem({
  //   question: " ",
  //   recommended_answer: " ",
  //   example_answer: " ",
  //   goal: "That's a difficult question to answer. It may vary from person to person."
  // });

  // // save the new document to the database
  // await personalProblem.save();
  // console.log("Personal problem saved to DB");

  // // save the new document to the database
  // await personalProblem.save();
  // console.log("Personal problem saved to DB");


  //start the server 
  app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
  });    
};

main();
