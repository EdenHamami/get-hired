import React from 'react';
import './EducationList.css';

const EducationList = ({ education, template,header }) => {
  return (
    <div className={`education-${template}`}>
      <h2>{header}</h2>
      {education.map((edu, index) => (
        <div key={index} className="education-item">
          <h3>{edu.degree}, {edu.institution}</h3>
          <p className='date'> {edu.startDate} - {edu.endDate}</p>
          <p className='grade'>Grade: {edu.grade}</p>
          <p className='description'>{edu.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EducationList;
