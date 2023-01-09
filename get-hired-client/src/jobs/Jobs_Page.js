import React, { useState } from 'react';
import Job from './Job'
import axios from "axios";
function Jobs_Page() {
  const [jobdescription, setjobdescription] = useState('');
  const [joblocation, setjoblocation] = useState('');
 
  const [jobsList, setJobsList] = useState([]);


  const Jobs = jobsList.map((con, key) => {
    return <Job {...con} key={key} />
  });

  async function handleSearch(event) {
    event.preventDefault();joblocation
    axios.post('http://127.0.0.1:3001/jobSearch', { jobdescription: jobdescription, joblocation: joblocation }).then(res => {
    console.log(res);
  });
  }
  return (
    <div>
      <form onSubmit={handleSearch}>
      <label>
        What:
        <input type="text" value={jobdescription} onChange={(event) => setjobdescription(event.target.value)} />
      </label>
      <label>
        Where:
        <input type="text" value={joblocation} onChange={(event) => setjoblocation(event.target.value)} />
      </label>
      <br />
      <button type="submit">Find Jobs</button>
    </form>
      <ul id="listg" className="list-group ">
                  {Jobs}
      </ul>
      
    </div>
  );
}
export default Jobs_Page;