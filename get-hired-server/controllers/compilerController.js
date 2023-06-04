
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



function results(test_output, stdout, test_input, is_succeed){
  if (test_output == stdout){
    return {result_to_user: "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout, is_succeed: is_succeed}
  }else{
    is_succeed = false
    return {result_to_user: 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + test_output + '\nyour output: ' + stdout, is_succeed: is_succeed}
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

//get topics
app.post('/topics',async (req, res) => {
  const problemType = await ProblemType.find();
  res.send(problemType);
});


//get the question
let question;
app.post('/question/:problemId',async (req, res) => {
  // PracticeProblem.find({}, function(err, practiceProblems) {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log(practiceProblems);
  //   }
  // });
  const problemId = req.params.problemId;
  question = await PracticeProblem.findOne({ _id:problemId });         

  const data = {
    title: question.title,
    content: question.content,
    examples: question.examples,
    number_of_tests: question.test.length
  };
  res.send(data);
});

let is_succeed = true
//send the initial code by the lang
app.post('/language',async (req, res) => {
  
  const {language} = req.body;
  const data = {
    initial_code: question[language].initial_code,
    solution: question[language].solution
  };
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

  const main_code = question[language].main;
  const header_code = question[language].header;

  const test_input = question.test[test_number].input
  const test_output = question.test[test_number].output

  text_file = header_code + input + main_code
  // add the code to the file 
    fs.writeFileSync('./temp/solution.py', text_file, (err) => {
      if (err) {
        console.error(err);
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
        res.send(formattedErrors.join('\n'));
        try {
          fs.unlinkSync('./temp/solution.py');
        } catch {
          return;
        }
      }else{
        // delet the file
        fs.unlinkSync('./temp/solution.py');
        result = results(test_output, stdout, test_input, is_succeed)
        result_to_user = result.result_to_user
        is_succeed = result.is_succeed
        res.send(result_to_user);
      }

      // in the last test- check if passed all the tests
      if(test_number == question.test.length-1){
        //add is_succeed to the db
        console.log("her: " + is_succeed)
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
      res.send(errorMessages.join('\n'));
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
        res.send(result_to_user);
    }
     // in the last test- check if passed all the tests
     if(test_number == question.test.length-1){
      //add is_succeed to the db
      console.log("wwwwx: " +test_number + " " +is_succeed)
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
      res.send(errorMessages.join('\n'));
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
      res.send(result_to_user);
    }

    // in the last test- check if passed all the tests
    if(test_number == question.test.length-1){
      //add is_succeed to the db
      console.log(is_succeed)
    }
  });
});

};