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

  const Difficulties = [
    { id: 1, name: '1-2'},
    { id: 2, name: '3'},
    { id: 3, name: '4-5'},
  ];
  const [showOptions, setShowOptions] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [difficultiesMarked, setDifficultiesMarked] = useState([]);

  const handleOptionClick2 = (optionId) => {
    const updatedOptions = options.map((option) =>
      option.id === optionId ? { ...option, checked: !option.checked } : option
    );
    setOptions(updatedOptions);
  //   options.map((option) =>
  //   console.log("the options: " + option.id +" "+option.checked)
  // );
  };

  function checkWordsExist(list1, list2) {
    for (let i = 0; i < list1.length; i++) {
      if (list2.includes(list1[i])) {
        return true;
      }
    }
    return false;
  }


  const handleDifficultiesClick = (difficultiesId) => {
    // const updatedDifficulties = Difficulties.map((option) =>
    //   option.id === difficultiesId ? { ...option, checked: !option.checked } : option
    // );
    const updatedDifficulties = difficultiesMarked.concat([difficultiesId])
    setDifficultiesMarked(updatedDifficulties);
  };

  const handleButtonClickOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleButtonClickDifficulty = () => {
    setShowDifficulty(!showDifficulty);
  };


  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    axios.post("http://127.0.0.1:3001/questions").then((response) => {
      setQuestions(response.data);
      setFilteredQuestions(response.data);
      console.log(response.data[4].types[0].name);
    });
    console.log(filteredQuestions)

  }, []);

 useEffect(() => {
    const filtered = questions.filter(question => question.title !== undefined && question.title.toLowerCase().includes(searchQuery.toLowerCase())
    && question)
    //const filtered = questions.filter(question => question.title !== undefined && question.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
    setFilteredQuestions(filtered);
    console.log(filteredQuestions)
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
    <button onClick={handleButtonClickOptions}>{showOptions ? 'Hide' : 'Show'} Options</button>
    
      {showOptions && (
        <ul>
        <button onClick={handleButtonClickDifficulty}>{showDifficulty ? 'Difficulty' : 'Difficulty'}</button>
        {showDifficulty && (
          <ul>
            {Difficulties.map((option) => (
              <li key={Difficulties.id}>
                <input type="checkbox" onChange={() => handleDifficultiesClick(option.id)} />
                {option.name}
              </li>
            ))}
          </ul>
        )}
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
      <td>{question.types.map((type) =>(
        <tr>{type.name}</tr>
      ))}</td>
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
