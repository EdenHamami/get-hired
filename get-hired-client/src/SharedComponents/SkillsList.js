import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import './SkillsList.css';

const SkillsList = ({ skills, template }) => {
  return (
    <div className={`skills-${template}`}>
      <h3> SKILLS</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
