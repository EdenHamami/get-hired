
const PracticeProblem = require('./models/practiceProblem');

module.exports = function configureServer(app){

//get the question
let question;
app.post('/question/:problemId',async (req, res) => {
  const problemId = req.params.problemId;
  question = await PracticeProblem.findOne({ _id:problemId }); 
  const data = {
    title: question.title,
    content: question.content,
    examples: question.examples,
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
  
  // get the code from the user
  const { input , language} = req.body;
  const { exec, execSync } = require('child_process');
  const fs = require('fs');

  const main_code = question[language].main;
  const header_code = question[language].header;

  const test_input = question.test[0].input
  const test_output = question.test[0].output

  text_file = header_code + input + main_code

  if (language == "python"){
  // add the code to the file 
    fs.writeFileSync('./temp/hellow.py', text_file, (err) => {
      if (err) {
        console.error(err);
      }
    });
    
    compile = 'py ./temp/hellow.py ' + test_input
    // compile the code
    exec(compile , (err, stdout, stderr) => {
      if (err) {
        res.send(stderr);
        return;
      }
      // delet the file
      fs.unlinkSync('./temp/hellow.py');

      if (test_output == stdout){
        result_to_user = "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout
      }else{
        result_to_user = 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + test_output + '\nyour output: ' + stdout
      }
      res.send(result_to_user);
    });

}else if (language == "cpp"){
  fs.writeFileSync('./temp/hellow.cpp', text_file, (err) => {
    if (err) {
      console.error(err);
    }
  });
  compile = 'g++ ./temp/hellow.cpp -o ./temp/output.exe && cd temp && output.exe ' + test_input
  exec(compile, (err, stdout, stderr) => {
    if (err) {
      res.send(stderr);
      return;
    }
    // Delete the files after program has finished executing
    fs.unlinkSync('./temp/hellow.cpp');
    fs.unlinkSync('./temp/output.exe');
    if (test_output == stdout){
      result_to_user = "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout
    }else{
      result_to_user = 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + test_output + '\nyour output: ' + stdout
    }
    res.send(result_to_user);


});
}else if (language == "java"){
  fs.writeFileSync('./temp/Hellow.java', text_file, (err) => {
    if (err) {
      console.error(err); 
    }
  });
  compile = 'cd temp && javac Hellow.java && java Hellow '+ test_input
  exec(compile, (err, stdout, stderr) => {
    if (err) {
      res.send(stderr);
      return;
    }
    // delet the file
    fs.unlinkSync('./temp/Hellow.java');
    fs.unlinkSync('./temp/Hellow.class');
    if (test_output == stdout){
      result_to_user = "Your code is correct\ninput: "+ test_input + "\noutput: " + stdout
    }else{
      result_to_user = 'Your code is incorrect, try again\ninput: '+ test_input + '\nthe correct output: ' + test_output + '\nyour output: ' + stdout
    }
    res.send(result_to_user);
  });
}
});
};