import { useEffect, useState } from "react";
import axios from "axios";
import './OnlineCompiler.css';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai'; // This theme provides a dark background
import { useLocation } from 'react-router-dom';
function OnlineCompiler() {

  const location = useLocation();
  const data = location.state;
  const problemId = data._id;

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
  const [solution, setSolution] = useState('');
  const [isSucceed, setIsSucceed] = useState('');
  const [numberOfTests, setNumberOfTests] = useState(0);

  useEffect(() => {

     // Replace with the actual problemId
    axios.post(`http://127.0.0.1:3001/question/${problemId}`).then(res => {
      console.log(res.data)
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
    if (!language){
      return;
    }
    console.log(input);
    console.log(language);
    setOutput([])
    for (let i = 0; i < numberOfTests; i++) {
      try {
        const res = await axios.post(`http://127.0.0.1:3001/compile/${language}/${problemId}`, { input: input, language: language, test_number: i },
         { headers: { 'Authorization': `${localStorage.getItem('token')}` } });
        console.log(res.data);
        setOutput(prevOutput => [...prevOutput, { case: i, output: res.data.message}]);
      } catch (error) {
        setOutput(prevOutput => [...prevOutput, { case: i, output: error.response.data.message }]);
      }
    }
    //save the sulotion in the db
    // const res = await axios.post(`http://127.0.0.1:3001/save-solution`, { input: input, language: language, is_succeed: res.data.is_succeed},
    //      { headers: { 'Authorization': `${localStorage.getItem('token')}` } });
  }
  const my_initial_code = (lang) => {
    console.log(input);
    console.log(language);
    axios.post(`http://127.0.0.1:3001/language/${problemId}`, { language: lang },{ headers: { 'Authorization': `${localStorage.getItem('token')}` } }).then(res => {
      console.log(res.data);
      setInput(res.data.initial_code);
      setSolution(res.data.solution)
    });
  };
  function handleChange(value) {
    setInput(value);
  }
  const [showSolution, setShowSolution] = useState(false);
  //show the solution
  const handleButtonClickSolution = () => {
    setShowSolution(!showSolution);
  };

  const handleBackClick = () => {
    window.history.back();
  };


  return (
    <div className="compiler-container">
      <div className="compiler-left-content">
        <h2 className="compiler-title">{title}</h2>
        <div className="compiler-question">{question}</div>
        <ul className="compiler-examples-list">
          {examples.map((item, index) => (
            <li key={index}>
              <h5>Example {index + 1}:</h5>
              <div>Input: {item.input}</div>
              <div>Output: {item.output}</div>
            </li>
          ))}
        </ul>
        <button  className="btn btn-primary" onClick={handleButtonClickSolution}>
        {showSolution ? 'Close Solution' : 'Open Solution'}
      </button>

      </div>
      <div className="compiler-right-content">

        <select className="compiler-language-select" value={language} onChange={(event) => {
          setLanguage(event.target.value);
          my_initial_code(event.target.value);
        }}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.value === '' && language !== ''}
          >
            {option.text}
          </option>
        ))}
  
        </select>
        <button className="btn btn-primary back" onClick={handleBackClick}>back</button>
        <h3>Input</h3>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={handleChange}
          value={input}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          style={{
            border: '1px solid black',
            borderRadius: '5px',
            height: '350px', // adjust this to your preferred height
            fontSize: '16px',
          }}
        />
        <h3>Output</h3>
        <ul className="compiler-output-list">
          {output.map((item, index) => (
            <li key={index}>
              <div>Case: {item.case}</div>
              <div>{item.output.split('\n').map(line => <span>{line}<br /></span>)}</div>
            </li>
          ))}
        </ul>
        <button id="submit" className="compiler-submit-button" onClick={my_print}>Submit</button>
        
        {showSolution && 
          <AceEditor
            mode="javascript"
            theme="monokai"
            value={solution}
            name="code-editor"
            readOnly={true} // Set readOnly prop to true
            editorProps={{ $blockScrolling: true }}
            style={{
              border: '1px solid black',
              borderRadius: '5px',
              height: '350px', // adjust this to your preferred height
              fontSize: '16px',
            }}
          />
        }


      </div>
    </div>
  );
}
export default OnlineCompiler;