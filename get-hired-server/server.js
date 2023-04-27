const Vacancy = require('./models/vacancy');
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
