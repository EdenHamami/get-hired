import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './App.css';
import * as React from "react";

function Filter(questions) {

  const [showDifficulty, setShowDifficulty] = useState(false);
  //const [difficultiesMarked, setDifficultiesMarked] = useState([]);

  const [Difficulties, setDifficultiesMarked]= useState([]);

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

  // Handle checkbox click event
  const handleTopicsClick = (topicId) => {
    const updatedTopics = topics.map((topic) =>
      topic.id === topicId ? { ...topic, checked: !topic.checked } : topic
    );
    setTopics(updatedTopics);
  };
  
  //get the topics from the server
  useEffect(() => {
    setTopics(questions.primaryTopics)
    setDifficultiesMarked(questions.primaryDifficulties)
    },[]);;



   //table after change in options
   useEffect(() => {
    console.log(questions)
    const marked_topics = getCheckedItems(topics)
    const marked_difficulties = getCheckedItems(Difficulties)

    let filtered = questions.theQuestions.filter(question => checkWordsExist(question.types.map(item => item.name),marked_topics) &&
     marked_difficulties.includes(question.difficultyLevel))

    if (marked_topics.length == 0 && marked_difficulties.length == 0){
      filtered = questions.theQuestions
    }else if (marked_topics.length == 0){
      filtered = questions.theQuestions.filter(question => 
      marked_difficulties.includes(question.difficultyLevel))
    }else if (marked_difficulties.length == 0){
      filtered = questions.theQuestions.filter(question => 
        checkWordsExist(question.types.map(item => item.name),marked_topics))
    }
    questions.updateQuestions(filtered);
    console.log(filtered)
  }, [topics, Difficulties]);

  //list1 exist one word from list2
  function checkWordsExist(list1, list2) {
    for (let i = 0; i < list1.length; i++) {
      if (list2.includes(list1[i])) {
        return true;
      }
    }
    return false;
  }

  //all the items in list that checked
  function getCheckedItems(items) {
    return items
      .filter(item => item.checked)
      .map(item => item.name);
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
        </ul>
      )}

    </div>
  );
}

export default Filter;
