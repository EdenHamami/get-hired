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

    req.user = decoded.userId;
    next();
  });
};


module.exports = function configureServer(app) {
  
  app.post('/loadCvData', verifyToken, async (req, res) => {

    try{
    var user = await User.findOne({ _id: req.user[0]._id });
    } catch{
   
      var user = await User.findOne({ _id: req.user._id });
    }
    const job = req.body
    

    if (jobExists) {
      return res.status(200).json({ message: 'Job already saved' });
    } else {
      user.interestedVacancies.push(job);
      await user.save();
      return res.status(200).json({ message: 'Job saved successfully' });
    }

  });

  app.post('/unsaveJob', verifyToken, async (req, res) => {
    try{
      var user = await User.findOne({ _id: req.user[0]._id });
      } catch{
     
        var user = await User.findOne({ _id: req.user._id });
      }
    const job = req.body
    const jobIndex = user.interestedVacancies.findIndex(job => job.company_name.toString() === job.company_name);

    if (jobIndex !== -1) {
      user.interestedVacancies.splice(jobIndex, 1);
      await user.save();
      return res.status(200).json({ message: 'Job deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Job not found' });
    }

  });

  app.post('/getSavedJobs', verifyToken, async (req, res) => {
    try{
      var user = await User.findOne({ _id: req.user[0]._id });
      } catch{
     
        var user = await User.findOne({ _id: req.user._id });
      }
    console.log("user:",user)
    const jobs = user.interestedVacancies.map((vacancy) => {
      const { _id, ...vacancyWithoutId } = vacancy.toObject();
      return vacancyWithoutId;
    });
    const jobsJSON = JSON.stringify(jobs);
    res.send(jobsJSON)
  });



};