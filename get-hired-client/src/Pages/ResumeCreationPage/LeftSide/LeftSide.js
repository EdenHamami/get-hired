import React, { useState, useContext } from 'react';
import Education from './Education'
import Summary from './Summary'
import PersonalInfo from './PersonalInfo'
import Skills from './Skills'
import Design from "./Design"
import WorkExperience from './WorkExperience';
import "../../../styles/LeftSide.css";
function LeftSide() {
  const [currentComponent, setCurrentComponent] = useState('PersonalInfo');

  function handleTabClick(component) {
    setCurrentComponent(component);
  }

  return (
    <div className="left-side">
    <div className="card text-center">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${currentComponent === 'PersonalInfo' ? 'active' : ''}`}
              aria-current="true"
              href="#"
              onClick={() => handleTabClick('PersonalInfo')}
            >
              Personal Info
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${currentComponent === 'Summary' ? 'active' : ''}`}
              href="#"
              onClick={() => handleTabClick('Summary')}
            >
              Summary
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${currentComponent === 'WorkExperience' ? 'active' : ''}`}
              href="#"
              onClick={() => handleTabClick('WorkExperience')}
            >
              Work Experience
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${currentComponent === 'Education' ? 'active' : ''}`}
              href="#"
              onClick={() => handleTabClick('Education')}
            >
              Education
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${currentComponent === 'Skills' ? 'active' : ''}`}
              href="#"
              onClick={() => handleTabClick('Skills')}
            >
              Skills
            </a>
          </li>
     
        </ul>
      </div>
      <div className="card-body">
        {currentComponent === 'PersonalInfo' && <PersonalInfo />}
        {currentComponent === 'Summary' && <Summary />}
        {currentComponent === 'WorkExperience' && <WorkExperience />}
        {currentComponent === 'Education' && <Education />}
        {currentComponent === 'Skills' && <Skills />}
      
      </div>
    </div>
    </div>

  );
  
}

export default LeftSide;
