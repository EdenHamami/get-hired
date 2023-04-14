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
    console.log("her1")
    const updatedDifficulties = Difficulties.map((difficulty) =>
    difficulty.id === difficultyId ? { ...difficulty, checked: !difficulty.checked } : difficulty
  );
  setDifficultiesMarked(updatedDifficulties);
  console.log("her2")
  };

  const [showTopics, setShowTopics] = useState(false);
  const [topics, setTopics] = useState([]);

  //open the difficulties options
  const handleButtonClickTopic = () => {
    setShowTopics(!showTopics);
  };

  //get the topics from the server
  useEffect(() => {
    axios.post("http://127.0.0.1:3001/topics").then((response) => {
      let my_list = [] 
      let i = 1
      response.data.map((topic) =>{
      my_list = [...my_list, { id: i, name: topic.name,checked: false}]
      i=i+1
      }
      );
      setTopics(my_list)
    });
    },[]);;

  // Handle checkbox click event
  const handleTopicsClick = (topicId) => {
    const updatedTopics = topics.map((topic) =>
      topic.id === topicId ? { ...topic, checked: !topic.checked } : topic
    );
    setTopics(updatedTopics);
    console.log(updatedTopics)
    console.log(topics)
  };


  const handleButtonClickFilter = () => {
    console.log(topics)
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
    
      { (
        <ul>
        <button onClick={handleButtonClickDifficulty}>{showDifficulty ? 'Difficulty' : 'Difficulty'}</button>
        {showDifficulty && (
          <ul>
            {Difficulties.map((option) => (
              <li key={option.id}>
                <input type="checkbox" checked={option.checked} onChange={() => handleDifficultiesClick(option.id)} />
                {option.name}
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleButtonClickTopic}>{showTopics ? 'Topic' : 'Topic'}</button>
        {showTopics && (
          <ul>
            {topics.map((option) => (
              <li key={option.id}>
                <input type="checkbox" checked={option.checked} onChange={() => handleTopicsClick(option.id)} />
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
