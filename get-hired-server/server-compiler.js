
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

app.post('/language',async (req, res) => {
  const {language} = req.body;
  console.log("langggg" + language)
  console.log(question[language])
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
  //const initial_code = question[language].initial_code;

 console.log("herrrr main for "+ language+"\n"+main_code);

  // const mainForLangs = question.main_for_lang
  //   for (const langObj of mainForLangs) {
  //     if (langObj.language === languge) {
  //       MainForLang = langObj.main;
  //       break;
  //     }
  //   }
 
  const test_input = question.test[0].input
  const test_output = question.test[0].output

  if (language == "python"){

    

    text_file = header_code + input + main_code
    console.log("this is the text file: " + text_file);
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
      console.log("test:"+test_output+":2");
    console.log("std:"+stdout+":2");
      if (test_output == stdout){
        result_to_user = stdout + '\nYour code is correct'
      }else{
        result_to_user = stdout + '\nYour code is incorrect, try again'
      }
      res.send(result_to_user);
    });

}else if (language == "cpp"){
console.log("her1")
  //text_file = "#include <iostream>\n#include <cstdlib>\n#include <vector>\n#include <unordered_map>\n#include <string>\n#include <cstring>\nusing namespace std;\n" + input + "\n" + MainForLang
  text_file = header_code + input + main_code
  console.log("her2")
  console.log("this is the text file c++: " + text_file);
  fs.writeFileSync('./temp/hellow.cpp', text_file, (err) => {
    if (err) {
      console.error(err);
      
    }
  });
  exec('g++ ./temp/hellow.cpp -o ./temp/output.exe && cd temp && output.exe '+ test_input, (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        res.send(stderr);
        return;
    }
    console.log("test:"+test_output+":2");
    console.log("std:"+stdout+":2");
    if (test_output == stdout){
        result_to_user = stdout + '\nYour code is correct'
    } else {
        result_to_user = stdout + '\nYour code is incorrect, try again'
    }

    console.log(stdout);
    res.send(result_to_user);

    // Delete the files after program has finished executing
    fs.unlinkSync('./temp/hellow.cpp');
    fs.unlinkSync('./temp/output.exe');
    console.log('Files deleted successfully');
});
}else if (language == "java"){
  //text_file = "import java.util.*;\nimport java.util.Arrays;\npublic class Hellow {\n\t" + input + "\n" + MainForLang
  text_file = header_code + input + main_code
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

    }
    
    console.log("test: "+test_output+" :2");
    console.log("std: "+stdout+" :2");if (test_output == stdout){
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