
const PracticeProblem = require('./models/practiceProblem');

module.exports = function configureServer(app){
let question;
app.post('/question/:problemId',async (req, res) => {
  const problemId = req.params.problemId;

  console.log(problemId);
  //const id = "640cce35298f4827800bf64b"
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

  let MainForLang

  const mainForLangs = question.main_for_lang
    for (const langObj of mainForLangs) {
      if (langObj.language === languge) {
        MainForLang = langObj.main;
        break;
      }
    }

  console.log("herrrr main for "+ languge+"\n"+MainForLang);

  
  const test_input = question.test[0].input
  const test_output = question.test[0].output

  if (languge == "python"){
    text_file = "import sys\n" + input + MainForLang
    console.log(test_output);
  // add the code to the file 
    fs.writeFileSync('./temp/hellow.py', text_file, (err) => {
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

  text_file = "#include <iostream>\n#include <cstdlib>\n" + input + "\n" + MainForLang

  console.log("this is the text file c++: " + text_file);
  fs.writeFileSync('./temp/hellow.cpp', text_file, (err) => {
    if (err) {
      console.error(err);
      
    }
  });
  exec('g++ ./temp/hellow.cpp -o ./temp/output.exe && cd temp && output.exe '+ test_input, (err, stdout, stderr) => {
    // delet the file

    try {
      fs.unlinkSync('./temp/hellow.cpp');
      fs.unlinkSync('./temp/output.exe');
      console.log('Files deleted successfully');
    } catch (err) {
      console.error(err);
    }
    //  fs.unlink('./temp/hellow.cpp && output.exe', (err) => {
    //   if (err) {
    //     console.error(err);
    //   }
    // });

    // console.log("this is the test input: " + test_input)
    // fs.unlink('./temp/output.exe' , (err) => {
    //   if (err) {
    //     console.error(err);
    //   }
    // });
    if (err) {
      console.log(err);
      res.send(stderr);
      return;
    }if (test_output[0] == stdout[0]){
      result_to_user = stdout + '\nYour code is correct'
    }else{
      result_to_user = stdout + '\nYour code is incorrect, try again'
    }
    res.send(result_to_user);
    console.log(stdout);
    
    //res.send(stdout);
    
     
  });
}else if (languge == "Java"){
  text_file = "public class Hellow {\n\t" + input + "\n" + MainForLang
  console.log("this is the text file java: " + text_file);

  fs.writeFileSync('./temp/Hellow.java', text_file, (err) => {
    if (err) {
      console.error(err);
      
    }
  });

  exec('cd temp && javac Hellow.java && java Hellow '+ test_input, (err, stdout, stderr) => {
    // delet the file

    try {
      fs.unlinkSync('./temp/Hellow.java');
      fs.unlinkSync('./temp/Hellow.class');
      console.log('Files deleted successfully');
    } catch (err) {
      console.error(err);
    }
    if (err) {
      console.log(err);
      res.send(stderr);
      return;
    }if (test_output[0] == stdout[0]){
      result_to_user = stdout + '\nYour code is correct'
    }else{
      result_to_user = stdout + '\nYour code is incorrect, try again'
    }
    res.send(result_to_user);
    console.log(stdout);
    
    //res.send(stdout);
    
     
  });
}
});
};