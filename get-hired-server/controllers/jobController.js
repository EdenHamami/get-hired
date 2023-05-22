const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'abcde12345eauofn213-e3i9rfnwjfwf';

const verifyToken = (req, res, next) => {
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
  
      // req.userId = decoded.userId;
      console.log(decoded.userId)
      next();
    });
  };


module.exports = function configureServer(app){
    app.post('/jobSearch', verifyToken , async (req, res) => {
        const userId = req.userId;
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
          search.json(params, callback);
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
  


};