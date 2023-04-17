
import {useEffect, useState} from "react";
import { Link, Route, Routes ,useLocation , useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../App.css';
import * as React from "react";

function SelectDifficulty() {

  const location = useLocation();
  const primaryTopics = location.state;

  const [primaryDifficulties, setPrimaryDifficulties]= useState([
    { id: 1, name: 'easy', checked:false},
    { id: 2, name: 'medium', checked:false},
    { id: 3, name: 'hard', checked:false},
  ]);

  // marked difficulties
  const handleDifficultiesClick = (difficultyId) => {
    const updatedDifficulties = primaryDifficulties.map((difficulty) =>
    difficulty.id === difficultyId ? { ...difficulty, checked: !difficulty.checked } : difficulty
  );
  setPrimaryDifficulties(updatedDifficulties);
  console.log(primaryDifficulties)
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/questions', {
      state: {
        primaryDifficulties: primaryDifficulties,
        primaryTopics: primaryTopics
      }
    });
  };

  return (
    <div>
    <h6>Select the difficulty that matches your 
    skills and goals, and we'll provide the 
    technical questions to help you prepare 
    for your next job interview.</h6>
          <ul>
            {primaryDifficulties.map((option) => (
              <li key={option.id}>
                <input type="checkbox" checked={option.checked} onChange={() => handleDifficultiesClick(option.id)} />
                {option.name}
              </li>
            ))}
          </ul>
          <button onClick={handleClick}>next</button>
    </div>
  );
}

export default SelectDifficulty;
