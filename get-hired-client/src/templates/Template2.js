import React, { useContext } from 'react';
import { ResumeContext } from "../context/ResumeContext";
import Header from "../SharedComponents/Header";
import PersonalDetails from "../SharedComponents/PersonalDetails";
import WorkExperienceList from "../SharedComponents/WorkExperienceList";
import EducationList from "../SharedComponents/EducationList";
import SkillsList from "../SharedComponents/SkillsList";
import Summary from "../SharedComponents/SummaryBlock";
import './Template2.css';
import { Row } from 'react-bootstrap';

const Template2 = () => {
  const {
    personalInfo,
    workExperience,
    education,
    skills,
    summary,
    designOptions,
  } = useContext(ResumeContext);

  return (
    <div className="template2"
         style={{
           color: designOptions.fontColor,
           fontFamily: designOptions.fontFamily,
           fontSize: `${designOptions.fontSize}rem`,
           wordWrap: 'break-word'
         }}>
      <div className="top-section" style={{ backgroundColor: designOptions.backgroundColor,wordWrap: 'break-word' }}>
        {personalInfo.image && (
          <img src={personalInfo.image} alt="Profile" className="profile-image" />
        )}
        <div className="header-and-summary">
          <Header personalInfo={personalInfo} template={2} />
          <Summary summary={summary} template={2} />
        </div>
      </div>
      <div className="bottom-section" style={{wordWrap: 'break-all'}}>
        <div className="left-column">
          <PersonalDetails personalInfo={personalInfo} template={2} className="template2-details" />
          <SkillsList skills={skills} template={2} />
        </div>
        <div className="divider"></div>
        <div className="right-column">
          <EducationList education={education} template={2} />
          <WorkExperienceList workExperience={workExperience} template={2} />
        </div>
      </div>
    </div>
  );
};

export default Template2;
