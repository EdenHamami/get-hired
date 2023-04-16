import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import * as React from "react";

function Filter(props) {

  const { questions, updateQuestions, primaryDifficulties, primaryTopics } = props;

  const [showDifficulty, setShowDifficulty] = useState(false);
  const [difficulties, setDifficulties]= useState([]);

  //open the difficulties options
  const handleButtonClickDifficulty = () => {
    setShowDifficulty(!showDifficulty);
  };

  // marked difficulties
  const handleDifficultiesClick = (difficultyId) => {
    const updatedDifficulties = difficulties.map((difficulty) =>
    difficulty.id === difficultyId ? { ...difficulty, checked: !difficulty.checked } : difficulty
  );
  setDifficulties(updatedDifficulties);
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

  //set the primary topics and difficulties
  useEffect(() => {
    setTopics(primaryTopics)
    setDifficulties(primaryDifficulties)
    },[]);;

   //table after changing
   useEffect(() => {
    const marked_topics = getCheckedItems(topics)
    const marked_difficulties = getCheckedItems(difficulties)

    let filtered = questions.filter(question => checkWordsExist(question.types.map(item => item.name),marked_topics) &&
     marked_difficulties.includes(question.difficultyLevel))

    if (marked_topics.length == 0 && marked_difficulties.length == 0){
      filtered = questions
    }else if (marked_topics.length == 0){
      filtered = questions.filter(question => 
      marked_difficulties.includes(question.difficultyLevel))
    }else if (marked_difficulties.length == 0){    
      filtered = questions.filter(question => 
      checkWordsExist(question.types.map(item => item.name),marked_topics))
    }
    updateQuestions(filtered);
  }, [topics, difficulties ,questions, primaryTopics, primaryDifficulties]);

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
      {(
        <ul>
        <button onClick={handleButtonClickDifficulty}>{showDifficulty ? 'Difficulty' : 'Difficulty'}</button>
        {showDifficulty && (
          <ul>
            {difficulties.map((option) => (
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
