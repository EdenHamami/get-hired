import React, { useContext, useState } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import './Education.css';

function Education() {
  const { education, setEducation } = useContext(ResumeContext);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    grade: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [addingNewEducation, setAddingNewEducation] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
    setEducation([...education, newEducation]);
    setNewEducation({
      institution: '',
      degree: '',
      grade: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    setAddingNewEducation(false);
    setActiveIndex(education.length);
  };

  const handleEducationChange = (index, name, value) => {
    setEducation((prevEducation) =>
      prevEducation.map((educationItem, i) =>
        i === index ? { ...educationItem, [name]: value } : educationItem
      )
    );
  };

  const toggleActiveIndex = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

return (
  <div className="education">
    <h2>Education</h2>
    <div className="education__items">
      {education.map((edu, index) => (
        <div key={index} className={`education__item ${index === activeIndex ? 'active' : ''}`}>
          <div className="education__item-header" onClick={() => toggleActiveIndex(index)}>
            <div className="education__item-institution">{edu.institution}</div>
            <div className="education__item-degree">{edu.degree}</div>
            <div className="education__item-dates">
              {edu.startDate} - {edu.endDate}
            </div>
          </div>
          {index === activeIndex && (
            <div className="education__item-body">
              <div className="form-group">
                <label htmlFor={`institution-${index}`}>Institution</label>
                <input
                  type="text"
                  className="form-control"
                  name={`institution-${index}`}
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`degree-${index}`}>Degree</label>
                <input
                  type="text"
                  className="form-control"
                  name={`degree-${index}`}
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`grade-${index}`}>Grade</label>
                <input
                  type="text"
                  className="form-control"
                  name={`grade-${index}`}
                  value={edu.grade}
                  onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`startDate-${index}`}>Start Date</label>
                <input
                  type="text"
                  className="form-control"
                  name={`startDate-${index}`}
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`endDate-${index}`}>End Date</label>
                <input
                  type="text"
                  className="form-control"
                  name={`endDate-${index}`}
                  value={edu.endDate}
                  onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`description-${index}`}>Description</label>
                <textarea
                  className="form-control"
                  name={`description-${index}`}
                  value={edu.description}
                  onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      ))}
      {addingNewEducation && (
        <div>
          <div className="form-group">
            <label htmlFor="institution">Institution</label>
            <input
              type="text"
              className="form-control"
              name="institution"
              value={newEducation.institution}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="degree">Degree</label>
            <input
              type="text"
              className="form-control"
              name="degree"
              value={newEducation.degree}
              onChange={handleInputChange}
            />
          </div>
<div className="form-group">
<label htmlFor="grade">Grade</label>
<input
             type="text"
             className="form-control"
             name="grade"
             value={newEducation.grade}
             onChange={handleInputChange}
           />
</div>
<div className="form-group">
<label htmlFor="startDate">Start Date</label>
<input
             type="text"
             className="form-control"
             name="startDate"
             value={newEducation.startDate}
             onChange={handleInputChange}
           />
</div>
<div className="form-group">
<label htmlFor="endDate">End Date</label>
<input
             type="text"
             className="form-control"
             name="endDate"
             value={newEducation.endDate}
             onChange={handleInputChange}
           />
</div>
<div className="form-group">
<label htmlFor="description">Description</label>
<textarea
             className="form-control"
             name="description"
             value={newEducation.description}
             onChange={handleInputChange}
           />
</div>
<button className="btn btn-primary" onClick={() => handleAddEducation(true)}>
Add Education
</button>
</div>
)}
{!addingNewEducation && (
<button className="btn btn-primary" onClick={() => setAddingNewEducation(true)}>
Add New Education
</button>
)}
</div>
</div>
);
}

export default Education;