import React from 'react';
import './Template2.css';

const Template2 = ({ personalInfo, workExperience, education, skills, summary, designOptions }) => {
  const { firstName, lastName, email, phone, address, image } = personalInfo;

  return (
    <div className="template2-container">
    <div className="wrapper">
      <div className="header">
        <h1>{firstName} {lastName}</h1>
        <p>{email} | {phone} | {address.street}, {address.city}, {address.state}</p>
      </div>
      <div className="section">
        <h2>Summary</h2>
        <p>{summary}</p>
      </div>
      <div className="section">
        <h2>Skills</h2>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Work Experience</h2>
        {workExperience.map((experience, index) => (
          <div key={index}>
            <h3>{experience.title} at {experience.company}</h3>
            <p>{experience.startDate} - {experience.endDate}</p>
            <p>{experience.description}</p>
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Education</h2>
        {education.map((edu, index) => (
          <div key={index}>
            <h3>{edu.degree} - {edu.institution}</h3>
            <p>{edu.startDate} - {edu.endDate}</p>
            <p>Grade: {edu.grade}</p>
            <p>{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Template2;
