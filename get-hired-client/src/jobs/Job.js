import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './Job.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Job({
  title,
  company_name,
  location,
  via,
  description,
  onUnsave,
  isFavorited = false,
}) {
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  function send_job() {
    var job_to_send = {
      title,
      company_name,
      location,
      via,
      description
    };
    return job_to_send;
  }

  async function save_to_favorites(event) {
    event.preventDefault();
    event.stopPropagation(); // Prevents event from bubbling up
    setIsFavorite(!isFavorite);
    if(!isFavorite){
    const r = await fetch('http://127.0.0.1:3001/saveJob', {
      method: 'POST',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send_job()),
    });
  }
  else{
      const r = await fetch('http://127.0.0.1:3001/unsaveJob', {
        method: 'POST',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(send_job()),
      });
      onUnsave(description);
  }
}

  return (
    <li className='job-contanier'>
      <Accordion className='job-content'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {/**Backend developer */}
            <div className='card-job-left'>
              <div className='card-job-title'> {title}</div>
            </div>
            <div className='card-job-center'>
              {/**gotfriends */}
              <div className='card-company-name'>{company_name}</div>
              {/**tel aviv via linkdin */}
              <div className='card-job-location'> {location}</div>
              <div className='card-job-via'>{via}</div>
            </div>

            {/**<3 */}
            <div className='card-favorite-icon-contanier'>

              <i
                className={`bi bi-heart favorite-icon ${isFavorite ? 'filled' : ''}`}
                onClick={save_to_favorites}
              ></i>
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
