import { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import { useLocation } from 'react-router-dom';


function OnlineCompiler() {
  const location = useLocation();
  const data = location.state;

  const options = [
    { value: '', text: '--Choose a language--' },
    { value: 'python', text: 'python 🍏' },
    { value: 'cpp', text: 'C++ 🍌' },
    { value: 'java', text: 'Java 🥝' },
  ];

  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [language, setLanguage] = useState('');
  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [examples, setExamples] = useState([]);
  const [numberOfTests, setNumberOfTests] = useState(0);

  useEffect(() => {

    const problemId = data._id; // Replace with the actual problemId
    axios.post(`http://127.0.0.1:3001/question/${problemId}`).then(res => {
      setQuestion(res.data.content);
      setTitle(res.data.title);
      setNumberOfTests(res.data.number_of_tests)
      console.log("her " + res.data.examples[0].input);
      res.data.examples.map((item, index) => {
        const newItem = { input: item.input, output: item.output };
        setExamples(prevList => [...prevList, newItem]);
      });
    });
  }, [location]);

  const my_print = async () => {
    console.log(input);
    console.log(language);
    setOutput([])
  
    for (let i = 0; i < numberOfTests; i++) {
      try {
        
        const res = await axios.post('http://127.0.0.1:3001/compile', { input: input, language: language, test_number: i });
        console.log(res.data);
        setOutput(prevOutput => [...prevOutput, {case:i, output:res.data}]);
      } catch (error) {
        console.log(error);
      }
    }
  }
  const my_initial_code = (lang) => {

    console.log(input);
    console.log(language);
    axios.post('http://127.0.0.1:3001/language', { language: lang }).then(res => {
      console.log(res.data);
      setInput(res.data);
    });
  };

  function handleChange(value) {
    setInput(value);
  }
  return (

    <div>
      <h2>{title}</h2>
      <div >{question}</div>
      <ul>
        {examples.map((item, index) => (
          <li key={index}>
            <h5>example {index + 1}:</h5>
            <div >input: {item.input}</div>
            <div >output: {item.output}</div>
          </li>
        ))}
      </ul>
      Languge : <select value={language} onChange={(event) => {
        setLanguage(event.target.value);
        my_initial_code(event.target.value);
      }}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <h3>input</h3>
      <AceEditor
        mode="javascript"
        theme="github"
        onChange={handleChange}
        value={input}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        style={{
          border: '1px solid black',
          borderRadius: '5px',
          height: '250px',
          width: '55%',
          fontSize: '16px',
        }}
      />
      <br />
      <h3>output</h3>
      <ul>
      {output.map((item, index) => (
        <li key={index}>
          <div >case: {item.case}</div>
          <div>{item.output.split('\n').map(line => <span>{line}<br/></span>)}</div>
        </li>
      ))}
    </ul>
      <br />

      <br />
      <button id="submit" onClick={my_print}>submit</button><br></br>
    </div>
  );
}

export default OnlineCompiler;
