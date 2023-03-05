
const PracticeProblem = require('./models/practiceProblem');

module.exports = function configureServer(app){
let question;
app.post('/question/:problemId',async (req, res) => {
  const problemId = req.params.problemId;

  console.log(problemId);
  //const id = "63f539d8623b91800090b315"
  question = await PracticeProblem.findOne({ _id:problemId }); 
  const content = question.content
  res.send(content);
});


// post requset to compile
app.post('/compile', (req, res) => {
  

  // get the code from the user
  const { input , languge} = req.body;
  const { exec } = require('child_process');
  const fs = require('fs');


  if (languge == "python"){
    const test_input = question.test[0].input
    const test_output = question.test[0].output
    console.log(test_output);
  // add the code to the file 
    fs.writeFileSync('./temp/hellow.py', input, (err) => {
      if (err) {
        console.error(err);
      }
      
      console.log(stdout);
      res.send(stdout);
    });
    
    compile = 'py ./temp/hellow.py ' + test_input
    console.log(compile)
    // compile the code
    exec(compile , (err, stdout, stderr) => {
      // delet the file
      fs.unlink('./temp/hellow.py', (err) => {
        if (err) {
          console.error(err);
        }
      });
      if (err) {
        console.log(err);
        res.send(stderr);
        return;
      }
      if (test_output[0] == stdout[0]){
        result_to_user = stdout + '\nYour code is correct'
      }else{
        result_to_user = stdout + '\nYour code is incorrect, try again'
      }
      res.send(result_to_user);
    });

}else if (languge == "C++"){
  console.log("herrr!!");
  fs.writeFileSync('./temp/hellow.cpp', input, (err) => {
    if (err) {
      console.error(err);
      
    }
  });
  exec('g++ ./temp/hellow.cpp -o ./temp/output.exe && cd temp && output.exe', (err, stdout, stderr) => {
    // delet the file
     fs.unlink('./temp/hellow.cpp', (err) => {
      if (err) {
        console.error(err);
      }
    });
    fs.unlink('./temp/output.exe', (err) => {
      if (err) {
        console.error(err);
      }
    });
    if (err) {
      console.log(err);
      res.send(stderr);
      return;
    }
    console.log(stdout);
    
    res.send(stdout);
    
     
  });

  
}
  
});

};