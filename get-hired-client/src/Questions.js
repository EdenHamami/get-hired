import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './App.css';
import * as React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Filter from './Filter';
import ReactDOM from 'react-dom';
import RegistrationPage from './RegistrationPage';
import SuccessfulRegistrationPage from './SuccessfulRegistrationPage';


function Questions() {

    //the questions table
    const [questions, setQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    
  //get the table from the server
  useEffect(() => {
    axios.post("http://127.0.0.1:3001/questions").then((response) => {
      setQuestions(response.data);
      setFilteredQuestions(response.data);
    });

    }, []);

    //search box changes
    const handleSearchQueryChange = (event) => {
      console.log("her "+ event.target.value)
      setSearchQuery(event.target.value);
    };

   //table after change in search box
    useEffect(() => {
      const filtered = questions.filter(question => question.title !== undefined && question.title.toLowerCase().includes(searchQuery.toLowerCase())
      && question)
      setFilteredQuestions(filtered);
      console.log(filteredQuestions)
    }, [searchQuery]);


// delet..
  const [options, setOptions] = useState([
    { id: 1, name: 'Option 1', checked: false },
    { id: 2, name: 'Option 2', checked: false },
    { id: 3, name: 'Option 3', checked: false },
  ]);

  //delet.. 
  const handleOptionClick2 = (optionId) => {
    const updatedOptions = options.map((option) =>
      option.id === optionId ? { ...option, checked: !option.checked } : option
    );
    setOptions(updatedOptions);
  };

  
  //open the filter options
  const handleButtonClickOptions = () => {
    setShowOptions(!showOptions);
  };

  const [showOptions, setShowOptions] = useState(false);  
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [difficultiesMarked, setDifficultiesMarked] = useState([]);

  const Difficulties = [
    { id: 1, name: '1-2'},
    { id: 2, name: '3'},
    { id: 3, name: '4-5'},
  ];

  //open the difficulties options
  const handleButtonClickDifficulty = () => {
    setShowDifficulty(!showDifficulty);
  };

  // marked difficulties
  const handleDifficultiesClick = (difficultiesId) => {
    const updatedDifficulties = difficultiesMarked.concat([difficultiesId])
    setDifficultiesMarked(updatedDifficulties);
  };

  const handleButtonClickFilter = () => {
    console.log("difficulties: " + difficultiesMarked)
  };

  //list1 exist one word from list2
  function checkWordsExist(list1, list2) {
    for (let i = 0; i < list1.length; i++) {
      if (list2.includes(list1[i])) {
        return true;
      }
    }
    return false;
  }

  return (
 
    <div>
    <Filter />
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
