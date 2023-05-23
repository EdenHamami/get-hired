import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import './StartingPage.css'; // Import the CSS file

const StartingPage = () => {


     return (
       <div>
           <div className="startingPage-container"> {/* Use the class name for the button container */}
           <div className='start-button'>
             <Link to="/RegistrationPage">
               <button className='btn btn-primary'>Let's start</button>
             </Link>
             </div>
           </div>
       </div>
     );
};

export default StartingPage;
