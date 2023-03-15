import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import './RegistrationPage'
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import RegistrationPage from './RegistrationPage';
import SuccessfulRegistrationPage from './SuccessfulRegistrationPage';
import { BrowserRouter as Router, Route ,Link, Routes,useRoutes} from 'react-router-dom';


function Online_Compiler() {
  const location = useLocation();
const data = location.state;
console.log(data.id);

    const options = [
        {value: '', text: '--Choose a language--'},
        {value: 'python', text: 'python 🍏'},
        {value: 'cpp', text: 'C++ 🍌'},
        {value: 'java', text: 'Java 🥝'},
      ];

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('');
    const [question, setQuestion] = useState('');
    const [examples, setExamples] = useState([]);


    useEffect(() => {

      const problemId =data.id; // Replace with the actual problemId
  axios.post(`http://127.0.0.1:3001/question/${problemId}`).then(res => {
        setQuestion(res.data.content);
        console.log("her " + res.data.examples[0].input);
        res.data.examples.map((item, index) => {
          const newItem = { input: item.input, output: item.output };
          setExamples(prevList => [...prevList, newItem]);
        }
        
        );
        });
    }, [location]); 

      const my_print = () => {
       
        console.log(input);
        console.log(language);
        axios.post('http://127.0.0.1:3001/compile', {input: input, language:language}).then(res => {
        console.log(res.data);
        setOutput(res.data);
        });
        
        // fetch('/compile')
        // .then(response => response.text())
        // .then(output => {
        //     console.log(output);
        // });
      };
      const my_initial_code = (lang) => {
       
        console.log(input);
        console.log(language);
        axios.post('http://127.0.0.1:3001/language', {language:lang}).then(res => {
        console.log(res.data);
        setInput(res.data);
        });
        
        // fetch('/compile')
        // .then(response => response.text())
        // .then(output => {
        //     console.log(output);
        // });
      };
  return (
 
   <div>
   <div >{question}</div> 
   <ul>
   {examples.map((item, index) => (
     <li key={index}>
      <h5>example {index+1}:</h5>
      <div >input: {item.input}</div>
      <div >output: {item.output}</div>
     </li>
   ))}
 </ul>
    <h3>input</h3>
    <textarea rows="13" cols="100" value={input} onChange={(event) => setInput(event.target.value)}>

    </textarea>
    <br/>
    <h3>output</h3>
    <textarea rows="13" cols="100" value={output} ></textarea>
    <br/>
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
    <br/>
    <button id="submit"  onClick={my_print}>submit</button><br></br>
   </div>
  );
}

export default Online_Compiler;
