import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './App.css';
import * as React from "react";
import { Link, useLocation} from "react-router-dom";
import Filter from './Filter';


function Questions() {

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
    axios.post("http://127.0.0.1:3001/questions").then((response) => {
      setQuestions(response.data);
      setFilteredQuestions(response.data);
    });

    }, []);

    //search box changes
    const handleSearchQueryChange = (event) => {
      console.log("her "+ event.target.value)
      setSearchQuery(event.target.value);
    };

   //table after change in search box
    useEffect(() => {
      const filtered = questions.filter(question => question.title !== undefined && question.title.toLowerCase().includes(searchQuery.toLowerCase())
      && question)
      setFilteredQuestions(filtered);
      console.log(filteredQuestions)
    }, [searchQuery]);

  return (
 
    <div>
    <Filter questions={questions} updateQuestions={updateQuestions} primaryDifficulties={primaryDifficulties} primaryTopics={primaryTopics}/>
    <nav class="navbar navbar-light bg-light">
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery}
    onChange={handleSearchQueryChange}/>
  </form>
</nav>
    <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Topic</th>
        <th scope="col">Difficulty</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
    {filteredQuestions.map((question) => (
      <tr>
      <th scope="row"><Link to="/online_compiler" state={question}>{question.title}</Link></th>
      <td>{question.types.map((type) =>(
        <tr>{type.name}</tr>
      ))}</td>
      <td>{question.difficultyLevel}</td>
      <td>##</td>
    </tr>
    ))}
    </tbody>
  </table>
    </div>
  );
}

export default Questions;
