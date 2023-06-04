import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle,  faUser,  faLightbulb } from "@fortawesome/free-solid-svg-icons";
import './ResumePortfolio.css'; // Import the CSS file

function TechnicalPersonal() {
  return (
    <div className="resume-portfolio-container">
      <h1 className='title-resume-portfolio'>What Kind of Questions Would You Like to Tackle?</h1>

      <div className="option-container">
        <div className="option">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <h2>Personal Questions</h2>
          <p className='resume-portfolio-text'>
          We've all stumbled over that classic 'what's your greatest weakness' question. 
          It can feel like walking a tightrope between honesty and creating a negative impression.
           Let's tackle this tightrope together,helping you turn potential negatives into positives, and present yourself as the perfect candidate          </p>
          <Link to="/personal_table" className="option-button">Perfect My Personal Prowess</Link>
        </div>

        <div className="option">
          <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
          <h2>Technical Questions</h2>
          <p className='resume-portfolio-text'>
          Data structures, system designs, and problem-solving - these terms can strike fear into the hearts of even the most seasoned tech professionals.
           It's time to change the narrative, turn anxiety into accomplishment, and transform your fear into a driving force towards success.  </p>     
              <Link to="/select_topics" className="option-button">Sharpen My Tech Talents!</Link>
        </div>
      </div>
    </div>
  );
}

export default TechnicalPersonal;
