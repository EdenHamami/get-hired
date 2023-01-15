import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import './RegistrationPage'
import ReactDOM from 'react-dom';
import RegistrationPage from './RegistrationPage';
import SuccessfulRegistrationPage from './SuccessfulRegistrationPage';
import { BrowserRouter as Router, Route ,Link, Routes,useRoutes} from 'react-router-dom';


function OnlineCompiler() {

    const options = [
        {value: '', text: '--Choose a languge--'},
        {value: 'python', text: 'python 🍏'},
        {value: 'C++', text: 'C++ 🍌'},
        // {value: 'kiwi', text: 'Kiwi 🥝'},
      ];

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [languge, setLanguge] = useState('');


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
    <h3>input</h3>
    <textarea rows="13" cols="100" value={input} onChange={(event) => setInput(event.target.value)}></textarea>
    <br/>
    <h3>output</h3>
    <textarea rows="13" cols="100" value={output} ></textarea>
    <br/>
    Languge : <select value={languge} onChange={(event) => setLanguge(event.target.value)}>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.text}
      </option>
    ))}
  </select>
    <br/>
    <button id="submit" className="btn btn-info btn-block btn-signin" onClick={my_print}>submit</button><br></br>
   </div>
  );
}

export default OnlineCompiler;
