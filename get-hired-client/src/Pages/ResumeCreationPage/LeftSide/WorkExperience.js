import React, { useContext, useState } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import './WorkExperience.css';

function WorkExperience() {
  const { workExperience, setWorkExperience } = useContext(ResumeContext);
  const [newWorkExperience, setNewWorkExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [addingNewWorkExperience, setAddingNewWorkExperience] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkExperience((prevWorkExperience) => ({
      ...prevWorkExperience,
      [name]: value,
    }));
  };

  const handleAddWorkExperience = () => {
    setWorkExperience([...workExperience, newWorkExperience]);
    setNewWorkExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    setAddingNewWorkExperience(false);
    setActiveIndex(workExperience.length);
  };

  const handleWorkExperienceChange = (index, name, value) => {
    setWorkExperience((prevWorkExperience) =>
      prevWorkExperience.map((workExpItem, i) =>
        i === index ? { ...workExpItem, [name]: value } : workExpItem
      )
    );
  };

  const toggleActiveIndex = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="workExperience">
      <h2>Work Experience</h2>
      <div className="workExperience__items">
        {workExperience.map((work, index) => (
          <div key={index} className={`workExperience__item ${index === activeIndex ? 'active' : ''}`}>
            <div className="workExperience__item-header" onClick={() => toggleActiveIndex(index)}>
              <div className="workExperience__item-title">{work.title}</div>
              <div className="workExperience__item-company">{work.company}</div>
              <div className="workExperience__item-dates">
                {work.startDate} - {work.endDate}
              </div>
            </div>
            {index === activeIndex && (
              <div className="workExperience__item-body">
                {/* Add the form elements here */}
                <div className="form-group">
                  <label htmlFor={`title-${index}`}>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name={`title-${index}`}
                    value={work.title}
                    onChange={(e) => handleWorkExperienceChange(index, 'title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`company-${index}`}>Company</label>
                  <input
                    type="text"
                    className="form-control"
                    name={`company-${index}`}
                    value={work.company}
                    onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`location-${index}`}>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name={`location-${index}`}
                    value={work.location}
                    onChange={(e) => handleWorkExperienceChange(index, 'location', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`startDate-${index}`}>Start Date</label>
                  <input
                    type="text"
                    className="form-control"
                    name={`startDate-${index}`}
                    value={work.startDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`endDate-${index}`}>End Date</label>
                  <input
                    type="text"
                    className="form-control"
                    name={`endDate-${index}`}
                    value={work.endDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`description-${index}`}>Description</label>
                  <textarea
                    className="form-control"
                    name={`description-${index}`}
                    value={work.description}
                    onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
   {addingNewWorkExperience && (
  <div>
    <div className="form-group">
      <label htmlFor="company">Company</label>
      <input
        type="text"
        className="form-control"
        name="company"
        value={newWorkExperience.company}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="position">Position</label>
      <input
        type="text"
        className="form-control"
        name="position"
        value={newWorkExperience.position}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="startDate">Start Date</label>
      <input
        type="text"
        className="form-control"
        name="startDate"
        value={newWorkExperience.startDate}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="endDate">End Date</label>
      <input
        type="text"
        className="form-control"
        name="endDate"
        value={newWorkExperience.endDate}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="description">Description</label>
      <textarea
        className="form-control"
        name="description"
        value={newWorkExperience.description}
        onChange={handleInputChange}
      />
    </div>
    <button className="btn btn-primary" onClick={handleAddWorkExperience}>
      Add Work Experience
    </button>
  </div>
)}

        {!addingNewWorkExperience && (
          <button className="btn btn-primary" onClick={() => setAddingNewWorkExperience(true)}>
            Add New Work Experience
          </button>
        )}
      </div>
    </div>
  );
}

export default WorkExperience;
