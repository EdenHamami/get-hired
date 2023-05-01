import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import israel_cities from './Israel_cities'
import jobsList from './JobsList'
import Job from './Job'

<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
  <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>import './Text_Field.css';
  <script src="~/lib/signalr/signalr.js"></script></link>
function JobsSearch() {

  let navigate = useNavigate();
  const [jobdescription, setjobdescription] = useState('');
  const [joblocation, setjoblocation] = useState('');
  const [resultList, setResultList] = useState([]);

  const Jobs = resultList.map((con, key) => {
    return <Job {...con} key={key} />
  });
 
  async function handleSearch(event) {
    event.preventDefault();   
    navigate('/JobsSearchResult', { state: {jobdescription: jobdescription, joblocation: joblocation} });
  }
  const handleOnSelectJob = (item) => {
    // the item selected
    setjobdescription(item.name)
  }
  const handleOnSelectCity = (item) => {
    // the item selected
    setjoblocation(item.name)
  }

  return (
    <div className="App">   
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
          placeholder="What would you like to work on?"
            items={jobsList}
            onSelect={handleOnSelectJob}
            autoFocus
          />
          <br></br>
          <ReactSearchAutocomplete
          placeholder="where?"
            //resultStringKeyName = "city"
            items={israel_cities}
            onSelect={handleOnSelectCity}
            autoFocus
          />
        <br></br>
        <button type="button" onClick={handleSearch} className="btn btn-light">Find Jobs</button>
        <button> <i className="bi bi-heart"></i></button>
        </div>
        </header>
    </div>
  )
}
export default JobsSearch