const InterviewProblem = require('../models/interviewProblem');
const path = require('path');

module.exports = function configureServer(app) {
  // get the question
  let interview;

  app.post('/interview-question/:selectedPosition', async (req, res) => {
    console.log("her111")
    const selectedPosition = req.params.selectedPosition;
    interview = await InterviewProblem.findOne({ type: selectedPosition });
    console.log(selectedPosition)
    console.log(interview)
    if (interview) {
      const data = {
        questions: interview.questions,
      };
      res.send(data);
    } else {
      res.status(404).send('No item found with the selected position');
    }
  });


  
};