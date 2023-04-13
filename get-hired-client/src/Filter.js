import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './App.css';
import * as React from "react";
import { Link, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom';
import RegistrationPage from './RegistrationPage';
import SuccessfulRegistrationPage from './SuccessfulRegistrationPage';


function Filter() {
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

  const [showOptions, setShowOptions] = useState(false); 

  //open the filter options
  const handleButtonClickOptions = () => {
    setShowOptions(!showOptions);
  };

  const [showDifficulty, setShowDifficulty] = useState(false);
  //const [difficultiesMarked, setDifficultiesMarked] = useState([]);

  const [Difficulties, setDifficultiesMarked]= useState([
    { id: 1, name: '1-2', checked:false},
    { id: 2, name: '3', checked:false},
    { id: 3, name: '4-5', checked:false},
  ]);

  //open the difficulties options
  const handleButtonClickDifficulty = () => {
    setShowDifficulty(!showDifficulty);
  };

  // marked difficulties
  const handleDifficultiesClick = (difficultyId) => {
    const updatedDifficulties = Difficulties.map((difficulty) =>
    difficulty.id === difficultyId ? { ...difficulty, checked: !difficulty.checked } : difficulty
  );
  setDifficultiesMarked(updatedDifficulties);


    //const updatedDifficulties = difficultiesMarked.concat([difficultiesId])
    //setDifficultiesMarked(updatedDifficulties);
  };

  const [showTopics, setShowTopics] = useState(false);
  const [topicsMarked, setTopicsMarked] = useState([]);

  const handleButtonClickFilter = () => {
    Difficulties.map((option) =>
    console.log("option: " + option.id + " chacked: " + option.checked)
    );
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
    <button onClick={handleButtonClickOptions}>{showOptions ? 'Hide' : 'Show'} Options</button>
    
      {showOptions && (
        <ul>
        <button onClick={handleButtonClickDifficulty}>{showDifficulty ? 'Difficulty' : 'Difficulty'}</button>
        {showDifficulty && (
          <ul>
            {Difficulties.map((option) => (
              <li key={option.id}>
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
          <button onClick={handleButtonClickFilter}>filter</button>
        </ul>
      )}

    </div>
  );
}

export default Filter;
