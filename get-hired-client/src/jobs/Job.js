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
  job_highlights,
  related_links,
  extensions,
  publishedDate,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  function send_job() {
    var job_to_send = {
      title: { title },
      company_name: { company_name },
      location: { location },
      via: { via },
      description: { description },
      job_highlights: { job_highlights },
      related_links: { related_links },
      extensions: { extensions },
      publishedDate: { publishedDate },
    };
    return job_to_send;
  }

  async function save_to_favorites(event) {
    event.preventDefault();
    setIsFavorite(!isFavorite);
    const r = await fetch('http://127.0.0.1:3001/saveJob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'hilanin', password: 'hila1234', job: send_job() }),
    });
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
// return (
//   <li className='job-contanier'>
//     <Accordion className='job-content'>
//       <Accordion.Item eventKey="0">
//         <Accordion.Header>
//           {/**Backend developer */}
//           <h5 className="card-header" id="title-name">
//             {title}
//           </h5>
//             {/**gotfriends */}
//           <div className="card-body">
//             <h5 className="card-title" id="company_name">
//               {company_name}
//             </h5>
//   {/**tel aviv via linkdin */}
//             <p className="card-text" id="location">
//               {location} <br />
//               {via}
//             </p>
//                 {/**<3 */}

//             <i
//               className={`bi bi-heart favorite-icon ${isFavorite ? 'filled' : ''}`}
//               onClick={save_to_favorites}
//             ></i>
//           </div>
//         </Accordion.Header>
//         <Accordion.Body>
//           <div>
//             {description.split('\n').map((line, index) => (
//               <p key={index}>{line}</p>
//             ))}
//           </div>
//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>

//   </li>
// );