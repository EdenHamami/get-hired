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
  const [showOptions, setShowOptions] = useState(false); 

  //open the filter options
  const handleButtonClickOptions = () => {
    setShowOptions(!showOptions);
  };

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
          <button onClick={handleButtonClickFilter}>filter</button>
        </ul>
      )}

    </div>
  );
}

export default Filter;
