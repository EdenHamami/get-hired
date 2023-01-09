import React from 'react'
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>import './Text_Field.css';</link>

function Job({jobDescription, location , appointmentPercentage, requirements, publishedDate}) {
    return (
        <button type="button" className="list-group-item list-group-item-action">
                        <div className="about">
                            <div id="name" className="name">{jobDescription}</div> 
                            <div id="last-messege"> 
                            {location}
                            </div>   
                            <div id="last-messege-time"> 
                            {appointmentPercentage}
                            </div>                               
                        </div>
                        </button>
    );
  }
  
  export default Job;

