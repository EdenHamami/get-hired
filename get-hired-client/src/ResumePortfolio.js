import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import './ResumePortfolio.css'; // Import the CSS file

function ResumePortfolio() {
  return (
    <div className="resume-portfolio-container">
      <h1 className='title-resume-portfolio'>Choose your path-superhero!</h1>

      <div className="option-container">
        <div className="option">
          <FontAwesomeIcon icon={faFileAlt} className="icon" />
          <h2>Create a Resume</h2>
          <p className='resume-portfolio-text'>
          Imagine creating a resume that tells your professional story in the most compelling way.
           That's exactly what we're here to help you do. Choose a design, 
          share your career highs and skills, and download a PDF resume that leaves a lasting impression          </p>
          <Link to="/OpeningPage" className="option-button">Create a Resume</Link>
        </div>

        <div className="option">
          <FontAwesomeIcon icon={faLightbulb} className="icon" />
          <h2>Upgrade Your Portfolio</h2>
          <p className='resume-portfolio-text'>
          Need to add a wow factor to your portfolio but running short on ideas? We're here to help. Answer some simple questions, 
          and we'll provide a project idea that aligns with your skills and propels your portfolio into the spotlight
          </p>
          <Link to="/PortfolioProposals" className="option-button">Upgrade Portfolio</Link>
        </div>
      </div>
    </div>
  );
}

export default ResumePortfolio;
