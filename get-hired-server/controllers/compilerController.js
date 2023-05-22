
const PracticeProblem = require('../models/practiceProblem');
const ProblemType = require('../models/problemType');


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

//send the initial code by the lang
app.post('/language',async (req, res) => {
  const {language} = req.body;
  const initial_code = question[language].initial_code;
  res.send(initial_code);
});

// post requset to compile
app.post('/compile', (req, res) => {
  console.log("her1")
  
  // get the code from the user
  const { input , language,test_number, } = req.body;
  const { exec, execSync } = require('child_process');
  const fs = require('fs');

  const main_code = question[language].main;
  const header_code = question[language].header;

  const test_input = question.test[test_number].input
  const test_output = question.test[test_number].output

  text_file = header_code + input + main_code
  
  if (language == "python"){
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
        res.send("compilation error");
        try{
          fs.unlinkSync('./temp/solution.py');
        }catch{
          return;
        }
        return;
      }
      // delet the file
      fs.unlinkSync('./temp/solution.py');

      if (test_output == stdout){
        result_to_user = "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout
      }else{
        result_to_user = 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + test_output + '\nyour output: ' + stdout
      }
      res.send(result_to_user);
    });

}else if (language == "cpp"){
  fs.writeFileSync('./temp/solution.cpp', text_file, (err) => {
    if (err) {
      console.error(err);
    }
  });
  compile = 'g++ ./temp/solution.cpp -o ./temp/output.exe && cd temp && output.exe ' + test_input
  exec(compile, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr)
      res.send("compilation error");
      try{
        fs.unlinkSync('./temp/solution.cpp');
      }catch{
        return;
      }
      try{
        fs.unlinkSync('./temp/output.exe');
      }catch{
        return;
      }
      return;
    }
    // Delete the files after program has finished executing
    fs.unlinkSync('./temp/solution.cpp');
    fs.unlinkSync('./temp/output.exe');
    if (test_output == "True"){
      if ("true" == stdout){
        result_to_user = "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout
      }else{
        result_to_user = 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + "true" + '\nyour output: ' + stdout
      }
    }else if (test_output == "False"){
      if ("false" == stdout){
        result_to_user = "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout
      }else{
        result_to_user = 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + "false" + '\nyour output: ' + stdout
      }
    }else{
      if (test_output == stdout){
        result_to_user = "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout
      }else{
        result_to_user = 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + test_output + '\nyour output: ' + stdout
      }

  }
  res.send(result_to_user);


});
}else if (language == "java"){

  fs.writeFileSync('./temp/Main.java', text_file, (err) => {
    if (err) {
      console.error(err); 
    }
  });
  compile = 'cd temp && javac Main.java && java Main '+ test_input
  exec(compile, (err, stdout, stderr) => {
    if (err) {
      res.send("compilation error");
      try{
        fs.unlinkSync('./temp/Main.java');
      }catch{
        return;
      }
      try{
        fs.unlinkSync('./temp/Main.class');
      }catch{
        return;
      }
      
      return;
    }
    // delet the file
    fs.unlinkSync('./temp/Main.java');
    fs.unlinkSync('./temp/Solution.class');
    fs.unlinkSync('./temp/Main.class');
    if (test_output == "True"){
      if ("true" == stdout){
        result_to_user = "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout
      }else{
        result_to_user = 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + "true" + '\nyour output: ' + stdout
      }
    }else if (test_output == "False"){
      if ("false" == stdout){
        result_to_user = "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout
      }else{
        result_to_user = 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + "false" + '\nyour output: ' + stdout
      }
    }else{
      if (test_output == stdout){
        result_to_user = "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout
      }else{
        result_to_user = 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + test_output + '\nyour output: ' + stdout
      }

  }
  res.send(result_to_user);
});

}
});
};