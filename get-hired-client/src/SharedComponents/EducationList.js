import React from 'react';
import './EducationList.css';

const EducationList = ({ education, template, header }) => {
  return (
    <div className={`education-${template}`}>
      <h2>{header}</h2>
      {education.map((edu, index) => (
        <div key={index} className="education-item">
          <h3>
            {edu.degree}
            {edu.degree && edu.institution && ', '}
            {edu.institution}
          </h3>
          <p className='date'>
            {edu.startDate}
            {edu.startDate && edu.endDate && '-'}
            {edu.endDate}
          </p>
          {edu.grade && <p className='grade'>Grade: {edu.grade}</p>}
          {edu.description && <p className='description'>{edu.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default EducationList;
