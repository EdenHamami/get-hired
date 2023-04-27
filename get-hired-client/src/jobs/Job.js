import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import './Job.css'
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>import './Text_Field.css';</link>

function Job({title, company_name , location, via,description, job_highlights, related_links, extensions, publishedDate}) {
    
  function send_job(){
    var job_to_send = {"title": {title},
    "company_name": {company_name},
    "location": {location},
      "via": {via},
    "description": {description},
    "job_highlights": {job_highlights},
  "related_links": {related_links},
  "extensions": {extensions},
   "publishedDate":{publishedDate}}
   return job_to_send
  }

  async function save_to_favorites(event) {
    event.preventDefault();   
    console.log("save to favorites")
    const r = await fetch('http://127.0.0.1:3001/saveJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: "hilanin", password : "hila1234", job: send_job() })
      });
    // make heart darker
  }
  
  return (
        <li>

        <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
          
  <h5 className="card-header" id="title-name" >{title}</h5>
  <div className="card-body">
    <h5 className="card-title" id="company_name" >{company_name}</h5>
    <p className="card-text" id="location">{location} <br></br>{via}</p>
    <button onClick = {save_to_favorites}>  save job for later<i className="bi bi-heart"></i></button>
    
   
  </div>

          
          </Accordion.Header>
          <Accordion.Body>
          <div>
      {description.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
          
          </Accordion.Body>
        </Accordion.Item>
        
      </Accordion>
                        </li>
    );
  }
  
  export default Job;