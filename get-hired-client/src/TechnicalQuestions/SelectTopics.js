import {useEffect, useState} from "react";
import { Link, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../App.css';
import * as React from "react";

function SelectTopics() {

  const [primaryTopics, setPrimaryTopics] = useState([]);

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
      setPrimaryTopics(my_list)
    });
    },[]);;

  // Handle checkbox click event
  const handleTopicsClick = (topicId) => {
    const updatedTopics = primaryTopics.map((topic) =>
      topic.id === topicId ? { ...topic, checked: !topic.checked } : topic
    );
    setPrimaryTopics(updatedTopics);
  };

  return (
    <div>
    <h6>Select your preferred topics below, and 
    we'll provide the questions and solutions 
    you need to ace your interview.</h6>
      <ul>
        {primaryTopics.map((option) => (
          <li key={option.id}>
            <input type="checkbox" checked={option.checked} onChange={() => handleTopicsClick(option.id)} />
            {option.name}
          </li>
        ))}
      </ul>
      <Link to="/select_difficulty" state={primaryTopics}>next</Link>
    </div>
  );
}

export default SelectTopics;
