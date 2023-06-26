import { useLocation } from 'react-router-dom';
import './JobsSearchResult.css';
import Job from './Job';
import React, { useState, useEffect } from 'react';

function SavedJobs() {
  const location = useLocation();

  const [savedJobsList, setsavedJobsList] = useState([]);
 // Remove job from local state
 const removeJobFromList = (jobDescription) => {
  setsavedJobsList(savedJobsList.filter(job => job.description !== jobDescription));
};

const Jobs = savedJobsList.map((con, key) => {
  return <Job {...con} key={key} onUnsave={removeJobFromList} isFavorited={true} />;
});


  async function SavedJobs() {
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
    setsavedJobsList(d);
  }

  useEffect(() => {
    SavedJobs();
  }, []);

  
  return (
    <div>
        <div className="job-results">
          <ul id="listg" className="list-group">
            {Jobs}
          </ul>
        </div>
     
    </div>
  );
}

export default SavedJobs;
