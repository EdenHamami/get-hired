import React, { useContext, useState } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import './WorkExperience.css';

function WorkExperience() {
  const { workExperience, setWorkExperience } = useContext(ResumeContext);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [addingNewExperience, setAddingNewExperience] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience((prevExperience) => ({
      ...prevExperience,
      [name]: value,
    }));
  };

  const handleAddExperience = () => {
    setWorkExperience([...workExperience, newExperience]);
    setNewExperience({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    setActiveIndex(workExperience.length);
    setAddingNewExperience(false);
  };

  const handleExperienceChange = (index, name, value) => {
    setWorkExperience((prevExperience) =>
      prevExperience.map((experienceItem, i) =>
        i === index ? { ...experienceItem, [name]: value } : experienceItem
      )
    );
  };

  const toggleActiveIndex = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className='workExperienceCard'>
        {workExperience.map((exp, index) => (
          <div key={index}>
            <div
              className={`experience-item-header ${index === activeIndex ? 'active' : ''}`}
              onClick={() => toggleActiveIndex(index)}
            >
              title: {exp.title} at: {exp.company}
              <span className="toggle-icon">{index === activeIndex ? '-' : '+'}</span>
            </div>
            {index === activeIndex && (
              <div className="experience-item-body">
                <div className="form-group">
                  <label htmlFor={`title-${index}`}>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name={`title-${index}`}
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`company-${index}`}>Company</label>
                  <input
                    type="text"
                    className="form-control"
                    name={`company-${index}`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`startDate-${index}`}>Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name={`startDate-${index}`}
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`endDate-${index}`}>End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name={`endDate-${index}`}
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`description-${index}`}>Description</label>
                  <textarea
                    className="form-control"
                    name={`description-${index}`}
                    value={exp.description}
                    onChange={(e) =>
                      handleExperienceChange(index, 'description', e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {addingNewExperience ? (
        <div className="adding-new-experience">
          <div className="form-group">
            <label htmlFor="newTitle">Title</label>
            <input
              type="text"
              className="form-control"
              name="newTitle"
              value={newExperience.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newCompany">Company</label>
            <input
              type="text"
              className="form-control"
              name="newCompany"
              value={newExperience.company}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newStartDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="newStartDate"
              value={newExperience.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
          <label htmlFor="newEndDate">End Date</label>
            <input
              type="date"
              className="form-control"
              name="newEndDate"
              value={newExperience.endDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newDescription">Description</label>
            <textarea
              className="form-control"
              name="newDescription"
              value={newExperience.description}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddExperience}>
            Add Experience
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setAddingNewExperience(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="btn btn-primary add-experience-btn"
          onClick={() => setAddingNewExperience(true)}
        >
          Add New Experience
        </button>
      )}
    </>
  );
}

export default WorkExperience;
