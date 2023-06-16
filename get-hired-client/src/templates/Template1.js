import React, { useContext, useState, useEffect, useRef } from 'react';
import { ResumeContext } from "../context/ResumeContext";
import Header from "../SharedComponents/Header";
import PersonalDetails from "../SharedComponents/PersonalDetails";
import WorkExperienceList from "../SharedComponents/WorkExperienceList";
import EducationList from "../SharedComponents/EducationList";
import SkillsList from "../SharedComponents/SkillsList";
import Summary from "../SharedComponents/SummaryBlock";
import './Template1.css';
import { Row } from 'react-bootstrap';

const Template1 = () => {
  const {
    personalInfo,
    workExperience,
    education,
    skills,
    summary,
    designOptions,
  
  } = useContext(ResumeContext);
  const line = {
    borderBottom: "3px solid " + designOptions.backgroundColor, // Use the background color of the left side for the line color
    width: "80%", // Set the width to 50% of the container element
    borderBottomWidth: "5px", // Set the height of the line to 5px
    marginBottom: "10px",

  };
  const [height, setHeight] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      setHeight(divRef.current.offsetHeight);
    }
  }, []);
  useEffect(() => {
    if (height > 1100) {
      alert(height,"Your CV is too long, it is not recommended to exceed one page, take this into account");
    }
  }, [height]);
    
  return (
    <div className="template1"  ref={divRef}
    style={{ color: designOptions.fontColor,
     fontFamily: designOptions.fontFamily, fontSize: `${designOptions.fontSize}em` }}>
      <section className='left'  style={{ backgroundColor: designOptions.backgroundColor,wordWrap: 'break-word'}}>
        <div className='template1-image-contanier'>
      {personalInfo.image && (
        <img src={personalInfo.image} alt="Profile" className="profile-image" />
      )}
      </div>
      <PersonalDetails personalInfo={personalInfo} template={1} className="template1-details" />
      <SkillsList skills={skills} template={1} />
      </section>
      <section className='right' style={{ backgroundColor: "#FFFFF",wordWrap: 'break-word'}}>
      <Header personalInfo={personalInfo} template={1} />
      <Summary summary={summary} template={1} header="SUMMARY"/>
      <div style={line}></div>
      <EducationList education={education} template={1} header="EDUCATION" />
      <div style={line}></div>
      <WorkExperienceList workExperience={workExperience} template={1} header="WORK EXPERIENCE"/>
      </section>
      </div>
  );
};

export default Template1;