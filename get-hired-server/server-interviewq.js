
const InterviewProblem = require('./models/interviewProblem');
const path = require('path');

module.exports = function configureServer(app){

  //get the question
let question;
app.post('/interview-question/:Id',async (req, res) => {
  const Id = req.params.Id;
  question = await InterviewProblem.findOne({ _id:Id });
  console.log("question")         

  const data = {
    videoUrl: question.videoUrl,
  };
  res.send(data);
});

};