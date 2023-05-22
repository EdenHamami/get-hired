import React from 'react';
import './WorkExperienceList.css';

const WorkExperienceList = ({ workExperience, template, header }) => {
  return (
    <div className={`work-experience-${template}`}>
      <h2>{header}</h2>
      {workExperience.map((experience, index) => (
        <div key={index} className="experience">
          <h3>
            {experience.title}
            {experience.title && experience.company && ', '}
            {experience.company}
          </h3>
          <p className='date'>
          {experience.startDate}
            {experience.startDate && experience.endDate && '-'}
            {experience.endDate}
          </p>
          <p className='description'>{experience.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkExperienceList;
