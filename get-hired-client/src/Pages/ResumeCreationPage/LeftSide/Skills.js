import React, { useContext, useState } from 'react';
import { ResumeContext } from "../../../context/ResumeContext";
import './Skills.css';

function Skills() {
  const { skills, setSkills } = useContext(ResumeContext);
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleAddSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill('');
  };

  const handleDeleteSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  return (
    <div className="skills">
      <h2>Skills</h2>
      <div className="skills__list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            {skill}
            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteSkill(index)}>
              X
            </button>
          </div>
        ))}
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="New skill"
          value={newSkill}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddSkill}>
        Add Skill
      </button>
    </div>
  );
}

export default Skills;
