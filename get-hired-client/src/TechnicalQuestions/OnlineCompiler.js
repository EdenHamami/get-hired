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
  const handleJokeButtonClick = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/api/joke');
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
  const [numberOfTests, setNumberOfTests] = useState(0);
  const getGPTFeedback = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3001/openai-prompt', { question, code: input });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  }
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

        const res = await axios.post(`http://127.0.0.1:3001/compile/${language}`, { input: input, language: language, test_number: i },
         { headers: { 'Authorization': `${localStorage.getItem('token')}` } });
        console.log(res.data);
        setOutput(prevOutput => [...prevOutput, { case: i, output: res.data }]);
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
        <button id="gpt-feedback" className="compiler-submit-button" onClick={getGPTFeedback}>GPT Feedback</button>
        <button onClick={handleJokeButtonClick}>Joke</button>
        <button onClick={handleButtonClickSolution}>
        {showSolution ? 'Close Solution' : 'Open Solution'}
      </button>
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
