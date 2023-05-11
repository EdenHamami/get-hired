import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../App.css';
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Filter from './Filter';
import './TechnicalQuestions.css';

function TechnicalQuestions() {

  //get the primary topics and difficulties
  const location = useLocation();
  const primaryDifficulties = location.state?.primaryDifficulties || [];
  const primaryTopics = location.state?.primaryTopics || [];

  //all the questions from the server
  const [questions, setQuestions] = useState([]);

  //the search box 
  const [searchQuery, setSearchQuery] = useState("");

  //the questions after changing in search box
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  function updateQuestions(newValue) {
    setFilteredQuestions(newValue);
  }

  //get the table from the server
  useEffect(() => {
    axios.post("http://127.0.0.1:3001/technical-questions").then((response) => {
      setQuestions(response.data);
      setFilteredQuestions(response.data);
    });
  }, []);

  //search box changes
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //table after change in search box
  useEffect(() => {
    const filtered = questions.filter(question => question.title.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredQuestions(filtered);
  }, [searchQuery, questions]);

  return (
    <div className="questions-container">
      <div className="questions-image-container"></div>
      <div className="questions-content-container">
        <Filter questions={questions} updateQuestions={updateQuestions} primaryDifficulties={primaryDifficulties} primaryTopics={primaryTopics} />
        <form className="form-inline questions-search-form">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery}
            onChange={handleSearchQueryChange} />
        </form>
        <table className="table questions-table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Topic</th>
              <th scope="col">Difficulty</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((question) => (
              <tr key={question.id}>
                <th className="question-name" scope="row"><Link to="/online_compiler" className="question-name"  state={question}>{question.title}</Link></th>
                <td>{question.types.map((type, index) => (
                  <div className="question-topic" key={index}>{type.name}</div>
                ))}</td>
                <td>{question.difficultyLevel}</td>
                <td>##</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TechnicalQuestions;
