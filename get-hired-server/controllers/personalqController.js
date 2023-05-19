
const PersonalProblem = require('../models/personalProblem');

module.exports = function configureServer(app){

  app.post('/personal-questions', async (req, res) => {
    try {
      const personalProblems = await PersonalProblem.find();
      res.status(200).json(personalProblems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


//get the question
let question;
app.post('/personal-question/:problemId',async (req, res) => {
  // PracticeProblem.find({}, function(err, practiceProblems) {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log(practiceProblems);
  //   }
  // });
  
  const problemId = req.params.problemId;
  console.log(problemId)
  question = await PersonalProblem.findOne({ _id:problemId });         
  console.log(question)
  const data = {
    name: question.name,
    question: question.question,
    goal: question.goal,
    recommended_answer: question.recommended_answer,
    example_answer: question.example_answer,
  };
  res.send(data);
});


};