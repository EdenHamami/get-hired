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
        {value: '', text: '--Choose a languge--'},
        {value: 'python', text: 'python 🍏'},
        {value: 'C++', text: 'C++ 🍌'},
        {value: 'Java', text: 'Java 🥝'},
      ];

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [languge, setLanguge] = useState('');
    const [question, setQuestion] = useState('');


    useEffect(() => {

      const problemId =data.id; // Replace with the actual problemId
  axios.post(`http://127.0.0.1:3001/question/${problemId}`).then(res => {
        setQuestion(res.data);
        console.log("her" + res.data);
        });
    }, [location]); 

      const my_print = () => {
       
        console.log(input);
        console.log(languge);
        axios.post('http://127.0.0.1:3001/compile', {input: input, languge:languge}).then(res => {
        console.log(res.data);
        setOutput(res.data);
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
    <h3>input</h3>
    <textarea rows="13" cols="100" value={input} onChange={(event) => setInput(event.target.value)}>

    </textarea>
    <br/>
    <h3>output</h3>
    <textarea rows="13" cols="100" value={output} ></textarea>
    <br/>
    Languge : <select value={languge} onChange={(event) => {
      setLanguge(event.target.value);
      setInput("Here is the initial code of " + event.target.value);
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
