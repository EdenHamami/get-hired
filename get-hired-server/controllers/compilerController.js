
const PracticeProblem = require('../models/practiceProblem');
const ProblemType = require('../models/problemType');
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


const save_to_db = async (req, question_id, solution, language, is_succeed) => {
  try {
    var user = await User.findOne({ _id: req.user[0]._id });
  } catch {
    var user = await User.findOne({ _id: req.user._id });
  }
  console.log(user);
  console.log(question_id);
  const questionExists = user.myPracticeProblems.some(savedQuestion => savedQuestion.problem.toString() === question_id);
  if (questionExists) {
    // Find the existing question in myPracticeProblems array
    const existingQuestion = user.myPracticeProblems.find(savedQuestion => savedQuestion.problem.toString() === question_id);
    
    // Check if a solution with the same language already exists
    const existingSolutionIndex = existingQuestion.solutions.findIndex(existingSolution => existingSolution.language === language);
    existingQuestion.isSucceed = is_succeed
    if (existingSolutionIndex !== -1) {
      // If a solution with the same language exists, update its solution
      existingQuestion.solutions[existingSolutionIndex].solution = solution;
    } else {
      // Otherwise, add a new solution to the existing question's solutions array
      existingQuestion.solutions.push({
        language: language,
        solution: solution
      });
    }
  } else {
    user.myPracticeProblems.push({
      problem: question_id,
      solutions: [{
        language: language,
        solution: solution
      }],
      isSucceed: is_succeed
    });
  }
  await user.save();
  console.log(user);
};


function results(test_output, stdout, test_input, is_succeed){
  if (test_output == stdout){
    return {result_to_user: "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout, is_succeed: is_succeed, state: 'correct'}
  }else{
    is_succeed = false
    return {result_to_user: 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + test_output + '\nyour output: ' + stdout, is_succeed: is_succeed, state: 'incorrect'}
  }
}

module.exports = function configureServer(app){

  app.post('/technical-questions', async (req, res) => {
    try {
      const practiceProblems = await PracticeProblem.find({})
        .populate({
          path: 'types',
          select: '_id name'
        })
        .exec();
  
      res.send(practiceProblems);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

  app.post('/is_succeed', verifyToken, async (req, res) => {

    const {question_id} = req.body;
    console.log("herrrrrr: "+ question_id)
    try {
      var user = await User.findOne({ _id: req.user[0]._id });
    } catch {
      var user = await User.findOne({ _id: req.user._id });
    }
    question = await PracticeProblem.findOne({ _id:question_id });
    console.log(user);
    console.log(question_id);
    const questionExists = user.myPracticeProblems.some(savedQuestion => savedQuestion.problem.toString() === question_id);
    if (questionExists) {
      // Find the existing question in myPracticeProblems array
      const existingQuestion = user.myPracticeProblems.find(savedQuestion => savedQuestion.problem.toString() === question_id);
      return res.status(200).json({ message: existingQuestion.isSucceed });
    }else{
      return res.status(404).json({ message: 'question not found' });
    }
  });

//get topics
app.post('/topics',async (req, res) => {
  const problemType = await ProblemType.find();
  res.send(problemType);
});


//get the question
let question = null;
app.post('/question/:problemId',async (req, res) => {
  // PracticeProblem.find({}, function(err, practiceProblems) {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log(practiceProblems);
  //   }
  // });
  const problemId = req.params.problemId;
  question = await PracticeProblem.findOne({ _id: problemId })
  .populate('types', 'name');       

  const typeNames = question.types.map(type => type.name);
  const data = {
    title: question.title,
    content: question.content,
    examples: question.examples,
    number_of_tests: question.test.length,
    difficultyLevel: question.difficultyLevel,
    types: typeNames /// her i dont want to send the IDs i want to senf the names of the types
  };
  res.send(data);
});

let is_succeed = true
//send the initial code by the lang
app.post('/language', verifyToken ,async (req, res) => {
  const {language} = req.body;
  const data = {
    initial_code: question[language].initial_code,
    solution: question[language].solution
  };
  try {
    var user = await User.findOne({ _id: req.user[0]._id });
  } catch {
    var user = await User.findOne({ _id: req.user._id });
  }
  const questionExists = user.myPracticeProblems.some(savedQuestion => savedQuestion.problem.toString() === question._id.toString());
  if (questionExists) {
    // Find the existing question in myPracticeProblems array
    const existingQuestion = user.myPracticeProblems.find(savedQuestion => savedQuestion.problem.toString() === question._id.toString());
    // Check if a solution with the same language already exists
    const existingSolutionIndex = existingQuestion.solutions.findIndex(existingSolution => existingSolution.language === language);
    if (existingSolutionIndex !== -1) {
      data.initial_code = existingQuestion.solutions[existingSolutionIndex].solution
      // If a solution with the same language exists, update its solution
      console.log(data.initial_code)
    } 
  }
  res.send(data);
});



app.post('/compile/python', verifyToken, (req, res) => {
  // get the code from the user
  const { input , language,test_number, } = req.body;
  const { exec, execSync } = require('child_process');
  const fs = require('fs');

  if (test_number == 0){
    is_succeed = true
  }
  console.log("her00: " + question.title)
  const main_code = question[language].main;
  const header_code = question[language].header;
  const test_input = question.test[test_number].input
  const test_output = question.test[test_number].output
  text_file = header_code + input + main_code
  // add the code to the file 
    fs.writeFileSync('./temp/solution.py', text_file, (err) => {
      if (err) {
        console.error(err);
        res.status(200)
      }
    });

    compile = 'py ./temp/solution.py ' + test_input
    // compile the code
    exec(compile , (err, stdout, stderr) => {
      if (err) {
        is_succeed = false;
        console.error(err);
        // Extract the error message using regular expressions
        let errorMessages = stderr.split("line").slice(1); // Split the error messages at lines starting with "File"
        let formattedErrors = [];
        for (let i = 0; i < errorMessages.length; i++) {
          let errorMessage = errorMessages[i];
          if (!errorMessage.includes("in <module>")) {
            errorMessage = errorMessage.replace(/^\s*\d+\s*|, in <module>\n[\s\S]*?\n^\s*\^\^\^\^\^\^\^\^\n/gm, ''); // Remove leading line number and the line marker causing the error
            errorMessage = "error: " + errorMessage.replace(/(^\s*\d+\s*|File "[^"]+"\s*,)/g, ''); // Remove leading line number and file path
            formattedErrors.push(errorMessage.trim());
          }
        }
        res.status(400).json({state: 'error', message: formattedErrors.join('\n')});
        try {
          fs.unlinkSync('./temp/solution.py'); // לתקןןןןן
        } catch {
          return;
        }
      }else{
        // delet the file
        fs.unlinkSync('./temp/solution.py');
        result = results(test_output, stdout, test_input, is_succeed)
        result_to_user = result.result_to_user
        is_succeed = result.is_succeed
        state = result.state
        
        res.status(200).json({state: state, message: result_to_user});
      }

      // in the last test- check if passed all the tests
      if(test_number == question.test.length-1){
        //add is_succeed to the db
        save_to_db(req, question.id, input, language, is_succeed)
      }
    });   
})


app.post('/compile/cpp', verifyToken, (req, res) => {
  // get the code from the user
  const { input , language,test_number, } = req.body;
  const { exec, execSync } = require('child_process');
  const fs = require('fs');

  if (test_number == 0){
    is_succeed = true
  }

  const main_code = question[language].main;
  const header_code = question[language].header;

  const test_input = question.test[test_number].input
  const test_output = question.test[test_number].output

  text_file = header_code + input + main_code
  // add the code to the file 
  fs.writeFileSync('./temp/solution.cpp', text_file, (err) => {
    if (err) {
      is_succeed = false
      console.error(err);
    }
  });
  compile = 'g++ ./temp/solution.cpp -o ./temp/output.exe && cd temp && output.exe ' + test_input
  exec(compile, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr)
      is_succeed = false
      // Extract the error message without line number and file location
      const errorLines = stderr.split('\n');
      const errorMessages = [];
      let i = 1
      for (const line of errorLines) {
        if (line.includes('error:')) {
          const cleanedErrorMessage = line.replace(/.*error: /, 'error: ');
          i +=1
          errorMessages.push(cleanedErrorMessage);
        }
      }
      errorMessages.push(i-1 + " errors");
      res.status(400).json({state: 'error', message: errorMessages.join('\n')});
      try{
        fs.unlinkSync('./temp/solution.cpp');
      }catch{}
      try{
        fs.unlinkSync('./temp/output.exe');
      }catch{}
    }else{
      // Delete the files after program has finished executing
      fs.unlinkSync('./temp/solution.cpp');
      fs.unlinkSync('./temp/output.exe');
      let new_test_output = test_output.replace(/True|False/gi, function(match) {
        return match === "True" ? "true" : "false";});
        result = results(new_test_output, stdout, test_input, is_succeed)
        result_to_user = result.result_to_user
        is_succeed = result.is_succeed
        state = result.state
        res.status(200).json({state: state, message: result_to_user});
    }
    console.log("orpazzz:)")
     // in the last test- check if passed all the tests
     if(test_number == question.test.length-1){
      //add is_succeed to the db
      save_to_db(req, question.id, input, language, is_succeed)
    }
  });
})

// post requset to compile
app.post('/compile/java', verifyToken, (req, res) => {

  // get the code from the user
  const { input , language,test_number, } = req.body;
  const { exec, execSync } = require('child_process');
  const fs = require('fs');

  if (test_number == 0){
    is_succeed = true
  }

  const main_code = question[language].main;
  const header_code = question[language].header;

  const test_input = question.test[test_number].input
  const test_output = question.test[test_number].output

  text_file = header_code + input + main_code

  fs.writeFileSync('./temp/Main.java', text_file, (err) => {
    if (err) {
      is_succeed = false
      console.error(err); 
    }
  });
  compile = 'cd temp && javac Main.java && java Main '+ test_input
  exec(compile, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
      is_succeed = false;
  
      // Extract the error message without line number and file location
      const errorLines = stderr.split('\n');
      const errorMessages = [];
      let i = 1
      for (const line of errorLines) {
        if (line.includes('error:')) {
          const cleanedErrorMessage = line.replace(/.*error: /, 'error: ');
          i +=1
          errorMessages.push(cleanedErrorMessage);
        }
      }
      errorMessages.push(i-1 + " errors");
      res.status(400).json({state: 'error', message: errorMessages.join('\n')});
      try {
        fs.unlinkSync('./temp/Main.java');
      } catch {}
      try {
        fs.unlinkSync('./temp/Main.class');
      } catch {}
    }else {
      // delet the file
      fs.unlinkSync('./temp/Main.java');
      fs.unlinkSync('./temp/Solution.class');
      fs.unlinkSync('./temp/Main.class');
      let new_test_output = test_output.replace(/True|False/gi, function(match) {
        return match === "True" ? "true" : "false";});
      result = results(new_test_output, stdout, test_input, is_succeed)
      result_to_user = result.result_to_user
      is_succeed = result.is_succeed
      state = result.state
      res.status(200).json({state: state, message: result_to_user});
    }

    // in the last test- check if passed all the tests
    if(test_number == question.test.length-1){
      //add is_succeed to the db
      console.log("herr: " + is_succeed)
      save_to_db(req, question.id, input, language, is_succeed)
    }
  });
});

};