import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import israel_cities from './Israel_cities'
import jobsList from './JobsList'
import { useLocation } from 'react-router-dom';
import './JobsSearchResult.css'
import Job from './Job'
import React, { useState, useEffect } from 'react';
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>import './Text_Field.css';</link>


function JobsSearchResult() {
  const location = useLocation();
  const [jobdescription, setjobdescription] = useState(location.state.jobdescription);
  const [joblocation, setjoblocation] = useState(location.state.joblocation);
  const [resultList, setResultList] = useState([]);

  const Jobs = resultList.map((con, key) => {
    return <Job {...con} key={key} />
  });
 
  async function handleSearch(event) {
    event.preventDefault();   
    fetchData();
  }
  const handleOnSelectJob = (item) => {
    // the item selected
    setjobdescription(item.name)
  }
  const handleOnSelectCity = (item) => {
    // the item selected
    setjoblocation(item.name)
  }
  
  async function fetchData() {
    const r = await fetch('http://127.0.0.1:3001/jobSearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobdescription: jobdescription, joblocation: joblocation })
      });
    const d = await r.json();
    setResultList(d);
  }

  async function hanleSelectSavedJob() {
    const r = await fetch('http://127.0.0.1:3001/getSavedJobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'eden' })
      });
    const d = await r.json();
    setResultList(d);
  }

  useEffect(() => {
    console.log({jobdescription})
    fetchData();
  }, [""]);
    
  
  return (
    <div className='search-result-page'>
     <div><button onClick={hanleSelectSavedJob}> Jobs you saved<i className="bi bi-heart"></i></button></div>
    <div className = 'search-bar'>
    <ReactSearchAutocomplete className = 'input-job'
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
        
        </div>
    <ul id="listg" className="list-group ">
    {Jobs}
</ul>
</div>
    );
  }
  
  export default JobsSearchResult;
