import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './App.css';
import * as React from "react";
import { Link, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom';
import RegistrationPage from './RegistrationPage';
import SuccessfulRegistrationPage from './SuccessfulRegistrationPage';


function Questions() {

  const [options, setOptions] = useState([
    { id: 1, name: 'Option 1', checked: false },
    { id: 2, name: 'Option 2', checked: false },
    { id: 3, name: 'Option 3', checked: false },
  ]);
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick2 = (optionId) => {
    const updatedOptions = options.map((option) =>
      option.id === optionId ? { ...option, checked: !option.checked } : option
    );
    setOptions(updatedOptions);
  };

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    axios.post("http://127.0.0.1:3001/questions").then((response) => {
      setQuestions(response.data);
      setFilteredQuestions(response.data);
      console.log(response.data);
    });
  }, []);

 useEffect(() => {
    const filtered = questions.filter(question => question.title !== undefined && question.title.toLowerCase().includes(searchQuery.toLowerCase()))
    //const filtered = questions.filter(question => question.title !== undefined && question.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
    setFilteredQuestions(filtered);
  }, [searchQuery]);


  const handleSearchQueryChange = (event) => {
    console.log("her "+ event.target.value)
    setSearchQuery(event.target.value);
   //setFilteredQuestions(filterQuestions(questions));
  };

 


  // const question1 = {
  //   id: '641192df318c49a618ac0d37',
  // }
  // const question2 = {
  //   id: '6411b43d4c5087e25b92bbd8',
  // }
  // const question3 = {
  //   id: '6411b436b8d7afb7435742a7',
  // }

  return (
 
    <div>
    <button onClick={handleButtonClick}>{showOptions ? 'Hide' : 'Show'} Options</button>
      {showOptions && (
        <ul>
          {options.map((option) => (
            <li key={option.id}>
              <input type="checkbox" checked={option.checked} onChange={() => handleOptionClick2(option.id)} />
              {option.name}
            </li>
          ))}
        </ul>
      )}
    <nav class="navbar navbar-light bg-light">
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery}
    onChange={handleSearchQueryChange}/>
  </form>
</nav>
    <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Topic</th>
        <th scope="col">Difficulty</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
    {filteredQuestions.map((question) => (
      <tr>
      <th scope="row"><Link to="/online_compiler" state={question}>{question.title}</Link></th>
      <td>{question.types}</td>
      <td>{question.difficultyLevel}</td>
      <td>##</td>
    </tr>
    ))}
    </tbody>
  </table>
  



    </div>
  );
}

export default Questions;
