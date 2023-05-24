import React, { useContext } from 'react';
import { ResumeContext } from "../context/ResumeContext";
import Header from "../SharedComponents/Header";
import PersonalDetails from "../SharedComponents/PersonalDetails";
import WorkExperienceList from "../SharedComponents/WorkExperienceList";
import EducationList from "../SharedComponents/EducationList";
import SkillsList from "../SharedComponents/SkillsList";
import Summary from "../SharedComponents/SummaryBlock";
import './Template3.css';
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const Template3 = () => {
  const {
    personalInfo,
    workExperience,
    education,
    skills,
    summary,
    designOptions,
  
  } = useContext(ResumeContext);
  const line = {
    borderBottom: "3px solid " + designOptions.fontColor, // Use the background color of the left side for the line color
    width: "100%", // Set the width to 50% of the container element
    borderBottomWidth: "3px", // Set the height of the line to 5px
    marginBottom: "6px",

  };
  return (
    <div className="template3" 
    style={{  backgroundColor: designOptions.backgroundColor2,color: designOptions.fontColor,
     fontFamily: designOptions.fontFamily, fontSize: `${designOptions.fontSize}rem`,wordWrap: 'break-word' }}>
      <section className='left'  style={{ backgroundColor: designOptions.backgroundColor,wordWrap: 'break-word'}}>
        <div className='template3-image-contanier'>
      {personalInfo.image && (
        <img src={personalInfo.image} alt="Profile" className="profile-image" />
      )}
      </div>
            <div className='left-content'>

       <Header personalInfo={personalInfo} template={3} />
       <div style={line}></div>
      <PersonalDetails personalInfo={personalInfo} template={3} className="template3-details" />
      <div style={line}></div>
      <SkillsList skills={skills} template={3} />
      </div>
      </section>
      <section className='right'>
        <div className='right-content'>
          <div className='summarySection'>
          <Summary summary={summary} template={3} header="ABOUT ME.."/>
          </div>
          <EducationList education={education} template={3} header="EDUCATION" />
          <WorkExperienceList workExperience={workExperience} template={3} header="WORK EXPERIENCE"/>
        </div>
      </section>

      </div>
  );
};

export default Template3;
