import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './SelectTopics.css';
import { FaCheckCircle } from "react-icons/fa";
import SelectTopicsLeft from './SelectTopicsLeft.png'; // Import your image here

function SelectTopics() {

  const [primaryTopics, setPrimaryTopics] = useState([]);

  useEffect(() => {
    axios.post("http://127.0.0.1:3001/topics").then((response) => {
      let my_list = [] 
      let i = 1
      response.data.map((topic) =>{
      my_list = [...my_list, { id: i, name: topic.name, checked: false}]
      i=i+1
      }
      );
      setPrimaryTopics(my_list)
    });
  },[]);

  const handleTopicsClick = (topicId) => {
    const updatedTopics = primaryTopics.map((topic) =>
      topic.id === topicId ? { ...topic, checked: !topic.checked } : topic
    );
    setPrimaryTopics(updatedTopics);
  };

  return (
    <div className="topics-container">
      <div className="select-topics-image-container"></div>
      <div className="select-topics-selection-container">
        {primaryTopics.map((option) => (
          <div key={option.id} className={`select-topics-topic-item ${option.checked ? 'checked' : ''}`} onClick={() => handleTopicsClick(option.id)}>
            <FaCheckCircle className="checkbox-icon" />
            {option.name}
          </div>
        ))}
        <Link to="/select_difficulty" className="select-topics-next-button">Next</Link>
      </div>
    </div>
  );
}

export default SelectTopics;
