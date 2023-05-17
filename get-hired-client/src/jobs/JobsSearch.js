import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import israel_cities from './Israel_cities'
import jobsList from './JobsList'
import Job from './Job'
import './JobsSearch.css';


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
    
        </div>
        <div className='findJobs'>
          <button type="button" onClick={handleSearch} className="findJobs-search-button">Find Jobs</button>
          </div>
      </div>
    </div>
  )
}
export default JobsSearch