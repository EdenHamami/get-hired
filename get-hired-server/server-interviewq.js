
const InterviewProblem = require('./models/interviewProblem');
const path = require('path');

module.exports = function configureServer(app){

//get the question
// app.post('/interview-question',async (req, res) => {
//   const videoPath = path.join(__dirname, 'videos', 'q1.mp4'); // Replace with the actual path to your video file

//   res.sendFile(videoPath);

//   });
  app.post('/interview-question',async (req, res) => {

  const videoPath = path.join(__dirname, 'videos', 'q1.mp4'); // Replace with the actual path to your video file
  res.setHeader('Content-Type', 'video/mp4');
  res.sendFile(videoPath);
  });
  

};