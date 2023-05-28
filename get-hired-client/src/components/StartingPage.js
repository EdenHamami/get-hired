import React from 'react';
import Button from './Button';
import { Link, useNavigate } from "react-router-dom";
import './StartingPage.css'; // Import the CSS file

const StartingPage = () => {
  const navigate = useNavigate();

async function is_logged_in(event) {
  console.log('inside')
  event.preventDefault();
  const response = await fetch('http://127.0.0.1:3001/user_name', {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    console.log('Menu')
    navigate('/Menu');
  } else {
    navigate('/LoginPage');
  }
 
}
     return (
       <div>
           <div className="startingPage-container">
           <div className='start-button'>        
               <button  className='btn btn-primary' onClick={is_logged_in} >Let's start</button>
             </div>
           </div>
       </div>
     );
};

export default StartingPage;
