import React from 'react';
import './Header.css';

const Header = ({ personalInfo, template }) => {
  return (
    <div className={`header-${template}`}>
      <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
      <h4>{personalInfo.desiredJob}</h4>
    </div>
  );
};

export default Header;
