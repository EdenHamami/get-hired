import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './PersonalDetails.css';

const PersonalDetails = ({ personalInfo, template }) => {
  return (
    <div className={`personal-details-${template}`}>
      <h3>CONTACTS</h3>
      <h5><FontAwesomeIcon icon={faEnvelope} /> {personalInfo.email}</h5>
      <h5><FontAwesomeIcon icon={faPhone} /> {personalInfo.phone}</h5>
      <h5><FontAwesomeIcon icon={faMapMarkerAlt} /> {personalInfo.street}, {personalInfo.city}, {personalInfo.state}</h5>
    </div>
  );
};

export default PersonalDetails;
