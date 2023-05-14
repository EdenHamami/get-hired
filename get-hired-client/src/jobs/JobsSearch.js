import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import israel_cities from './Israel_cities'
import jobsList from './JobsList'
import Job from './Job'
import './JobsSearch.css';

function JobsSearch() {
  let navigate = useNavigate();
  const [jobdescription, setjobdescription] = useState('');
  const [joblocation, setjoblocation] = useState('');
  const [resultList, setResultList] = useState([]);
  const [error, setError] = useState('');

  const Jobs = resultList.map((con, key) => {
    return <Job {...con} key={key} />
  });
 
  async function handleSearch(event) {
    event.preventDefault(); 
    if(!jobdescription || !joblocation) {
      setError('Both fields are required');
      return;
    }  
    navigate('/JobsSearchResult', { state: {jobdescription: jobdescription, joblocation: joblocation} });
  }
  
  const handleOnSelectJob = (item) => {
    setjobdescription(item.name)
  }
  
  const handleOnSelectCity = (item) => {
    setjoblocation(item.name)
  }

  return (
    <div className="job-search-contanier">
      <div className="job-search-left-side" ></div>
      <div className="job-search-right-side">
        <img src="./jobsTitle.png" className="jobSearchTitle" />
        <div className='jobs-inputs'>
          <ReactSearchAutocomplete
            placeholder="What would you like to work on?"
            items={jobsList}
            onSelect={handleOnSelectJob}
            autoFocus
          />
          <br />
          <ReactSearchAutocomplete
            placeholder="where?"
            items={israel_cities}
            onSelect={handleOnSelectCity}
            autoFocus
          />
          <br />
          {error && <p>{error}</p>}
        </div>
        <div className='findJobs'>
          <button type="button" onClick={handleSearch} className="findJobs-search-button">Find Jobs</button>
          </div>
      </div>
    </div>
  )
}

export default JobsSearch;
