import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../App.css';
import * as React from "react";
import { Link, useLocation} from "react-router-dom";




function PersonalTable() {

  //all the questions from the server
  const [questions, setQuestions] = useState([]);

  //the search box 
  const [searchQuery, setSearchQuery] = useState("");

  //the questions after changing in search box
  const [filteredQuestions, setFilteredQuestions] = useState([]);
    
  //get the table from the server
  useEffect(() => {
    axios.post("http://127.0.0.1:3001/personal-questions").then((response) => {
      setQuestions(response.data);
      setFilteredQuestions(response.data);
      console.log(response.data)
    });

    }, []);

    //search box changes
    const handleSearchQueryChange = (event) => {
      console.log("her "+ event.target.value)
      setSearchQuery(event.target.value);
    };

   //table after change in search box
    useEffect(() => {
      const filtered = questions.filter(question => question.name !== undefined && question.name.toLowerCase().includes(searchQuery.toLowerCase())
      && question)
      setFilteredQuestions(filtered);
      console.log(filteredQuestions)
    }, [searchQuery]);

  return (
 
    <div>
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
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
    {filteredQuestions.map((question) => (
      <tr>
      <th scope="row"><Link to="/personal_question" state={question}>{question.name}</Link></th>
      <td>##</td>
    </tr>
    ))}
    </tbody>
  </table>
    </div>
  );
}

export default PersonalTable;
