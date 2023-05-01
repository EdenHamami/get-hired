import React, { useState } from 'react';
import Job from './Job'
import axios from "axios";
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
  <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>import './Text_Field.css';
  <script src="~/lib/signalr/signalr.js"></script></link>

function Jobs_Page() {
  const [jobdescription, setjobdescription] = useState('');
  const [joblocation, setjoblocation] = useState('');
  const [jobsList, setJobsList] = useState([]);

  
  const Jobs = jobsList.map((con, key) => {
    return <Job {...con} key={key} />
  });

  async function handleSearch(event) {
    event.preventDefault();
  const r = await fetch('http://127.0.0.1:3001/jobSearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobdescription: jobdescription, joblocation: joblocation })
      });
  const d = await r.json();
  setJobsList(d);
  }
  return (
    <div>
      <form onSubmit={handleSearch}>
      <select className="form-select" aria-label="Default select example" onChange={(event) => setjobdescription(event.target.value)}>
      <option selected>What</option>
      <option value="Java Developer">Java Developer</option>
      <option value="Python Developer">Python Developer</option>
      <option value="software engeneer">software engeneer</option>
    </select>
    <label>
    what:
    <input type="text" value={jobdescription} onChange={(event) => setjobdescription(event.target.value)} />
  </label>
      <label>
        Where:
        <input type="text" value={joblocation} onChange={(event) => setjoblocation(event.target.value)} />
      </label>
      <br />
      <button type="submit">Find Jobs</button>
      <div>
     <div> popular search:</div>
     <button value="Java Developer" onClick={(event) => setjobdescription(event.target.value)}> Java Developer</button>
     <button value="software engeneer" onClick={(event) => setjobdescription(event.target.value)}> software engeneer</button>
     <button value="android Developer" onClick={(event) => setjobdescription(event.target.value)}> android Developer</button>
     </div>
    </form>
      <ul id="listg" className="list-group ">
                  {Jobs}
      </ul>
      
    </div>
  );
}
export default Jobs_Page;