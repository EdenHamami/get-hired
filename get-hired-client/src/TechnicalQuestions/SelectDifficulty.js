import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import './SelectDifficulty.css';

function SelectDifficulty() {

  const location = useLocation();
  const primaryTopics = location.state;

  const [primaryDifficulties, setPrimaryDifficulties]= useState([
    { id: 1, name: 'easy', checked:false},
    { id: 2, name: 'medium', checked:false},
    { id: 3, name: 'hard', checked:false},
  ]);

  const handleDifficultiesClick = (difficultyId) => {
    const updatedDifficulties = primaryDifficulties.map((difficulty) =>
      difficulty.id === difficultyId ? { ...difficulty, checked: !difficulty.checked } : difficulty
    );
    setPrimaryDifficulties(updatedDifficulties);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/technical_questions', {
      state: {
        primaryDifficulties: primaryDifficulties,
        primaryTopics: primaryTopics.primaryTopics
      }
    });
  };

  return (
    <div className="difficulty-container">
      <div className="select-difficulty-image-container"></div>
      <div className="select-difficulty-selection-container">
        {primaryDifficulties.map((option) => (
          <div key={option.id} className={`select-difficulty-item ${option.checked ? 'checked' : ''}`} onClick={() => handleDifficultiesClick(option.id)}>
            <FaCheckCircle className="checkbox-icon" />
            {option.name}
          </div>
        ))}
        <button className="select-difficulty-next-button" onClick={handleClick}>Next</button>
      </div>
    </div>
  );
}

export default SelectDifficulty;
