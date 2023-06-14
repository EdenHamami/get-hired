import React, { useContext, useState } from 'react';
import { ResumeContext } from "../../../context/ResumeContext";
import { AiFillCamera } from 'react-icons/ai';
import './PersonalInfo.css';

function PersonalInfo() {
  const { personalInfo, setPersonalInfo } = useContext(ResumeContext);
  const [previewImage, setPreviewImage] = useState(personalInfo.image || '');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevPersonalInfo) => ({
      ...prevPersonalInfo,
      [name]: value,
    }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      setPersonalInfo((prevPersonalInfo) => ({
        ...prevPersonalInfo,
        image: imageURL,
      }));
    } else {
      setPreviewImage('');
      setPersonalInfo((prevPersonalInfo) => ({
        ...prevPersonalInfo,
        image: 'hila.jpg', // Set it back to the default image when there is no file
      }));
    }
  };
  

  return (
    <div className="personal-info">
      <div className="personal-info__header">
        <h3>Personal Information</h3>
      </div>

      <div className="personal-info__image-container">
        <div className="personal-info__image">
          {previewImage ? (
            <img src={previewImage} alt="Profile" />
          ) : (
            <div className="personal-info__placeholder-image">
              <AiFillCamera className="personal-info__camera-icon" />
              <span>Add Photo</span>
            </div>
          )}
        </div>
        <label htmlFor="image" className="personal-info__upload-button">
          Upload Photo
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <div className="personal-info__form">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handleChange}
              
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="desiredJob" className="form-label">
              Desired Job
            </label>
            <input
              type="text"
              className="form-control"
              id="desiredJob"
              name="desiredJob"
              value={personalInfo.desiredJob}
              onChange={handleChange}
              
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              
            />
          </div>

          <div className="col-md-6">
                       <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="street" className="form-label">
              Street
            </label>
            <input
              type="text"
              className="form-control"
              id="street"
              name="street"
              value={personalInfo.street}
              onChange={handleChange}
              
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={personalInfo.city}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={personalInfo.state}
              onChange={handleChange}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
