import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import israel_cities from './Israel_cities';
import jobsList from './JobsList';
import { useLocation } from 'react-router-dom';
import './JobsSearchResult.css';
import Job from './Job';
import React, { useState, useEffect } from 'react';

function JobsSearchResult() {
  const location = useLocation();
  const [jobdescription, setjobdescription] = useState(location.state.jobdescription);
  const [joblocation, setjoblocation] = useState(location.state.joblocation);
  const [resultList, setResultList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const Jobs = resultList.map((con, key) => {
    return <Job {...con} key={key} />;
  });

  async function handleSearch(event) {
    event.preventDefault();
    fetchData();
  }

  const handleOnSelectJob = (item) => {
    setjobdescription(item.name);
  };

  const handleOnSelectCity = (item) => {
    setjoblocation(item.name);
  };

  async function fetchData() {
   
    setIsLoading(true); // Set loading state to true
    const r = await fetch('http://127.0.0.1:3001/jobSearch', {
      method: 'POST',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username:'Hila2034', jobdescription: jobdescription, joblocation: joblocation }),
    });
    const d = await r.json();
    setResultList(d);
    setIsLoading(false); // Set loading state to false when done
  }

  async function hanleSelectSavedJob() {
    const r = await fetch('http://127.0.0.1:3001/getSavedJobs', {
      method: 'POST',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
    const d = await r.json();
    console.log(d)
    setResultList(d);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="search-result-page">
      {isLoading && (
        <div className="loading-container">
          <img src="./loading.gif" alt="Loading..." className="loading-gif" />
        </div>
      )}
      <div className="search-result-left-side">
      </div>
      <div className="search-result-right-side">
        <div className="search-inputs">
          <ReactSearchAutocomplete
            className="input-job"
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
          <div className='button-contanier'>
          <button type="button" onClick={handleSearch} className="find-jobs-button">
            Find Jobs
          </button>
          </div>
        </div>
    
        <div className="job-results">
          <ul id="listg" className="list-group">
            {Jobs}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobsSearchResult;
