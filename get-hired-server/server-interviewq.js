
const InterviewProblem = require('./models/interviewProblem');
const path = require('path');

module.exports = function configureServer(app){

  //get the question
let interview;
app.post('/interview-question/:Id',async (req, res) => {
  const Id = req.params.Id;
  interview = await InterviewProblem.findOne({ _id:Id });
  console.log(interview)         

  const data = {
    questions: interview.questions,
  };
  res.send(data);
});

};