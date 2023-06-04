import {useEffect, useState} from "react";
import '../App.css';
import './Filter.css';

function Filter(props) {
  const { questions, updateQuestions, primaryDifficulties, primaryTopics, searchQuery, handleSearchQueryChange } = props;

  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [difficulties, setDifficulties] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    setTopics(primaryTopics)
    setDifficulties(primaryDifficulties)
  }, []);

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

  function handleDifficultiesClick(difficultyId) {
    const updatedDifficulties = difficulties.map((difficulty) =>
    difficulty.id === difficultyId ? { ...difficulty, checked: !difficulty.checked } : difficulty
    );
    setDifficulties(updatedDifficulties);
  }

  function handleTopicsClick(topicId) {
    const updatedTopics = topics.map((topic) =>
      topic.id === topicId ? { ...topic, checked: !topic.checked } : topic
    );
    setTopics(updatedTopics);
  }

  function checkWordsExist(list1, list2) {
    for (let i = 0; i < list1.length; i++) {
      if (list2.includes(list1[i])) {
        return true;
      }
    }
    return false;
  }

  function getCheckedItems(items) {
    return items
      .filter(item => item.checked)
      .map(item => item.name);
  }

  return (
    <div className="button-container">
        <form className="form-inline filter-search-form">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery}
            onChange={handleSearchQueryChange} />
        </form>
        <button className={showDifficulty ? 'active' : ''} onClick={() => setShowDifficulty(!showDifficulty)}>
            Difficulty
            {showDifficulty && (
            <ul className="dropdown-menu">
                {difficulties.map((option) => (
                <li key={option.id}>
                    <input type="checkbox" checked={option.checked} onChange={() => handleDifficultiesClick(option.id)} />
                    {option.name}
                </li>
                ))}
            </ul>
            )}
        </button>
        <button className={showTopics ? 'active' : ''} onClick={() => setShowTopics(!showTopics)}>
            Topic
            {showTopics && (
            <ul className="dropdown-menu">
                {topics.map((option) => (
                <li key={option.id}>
                    <input type="checkbox" checked={option.checked} onChange={() => handleTopicsClick(option.id)} />
                    {option.name}
                </li>
                ))}
            </ul>
            )}
        </button>
    </div>
  );
}

export default Filter;
