import React, { useState } from 'react';
import './CustomButton.css';

const CustomButton = ({ label }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      className={`custom-button ${isSelected ? 'selected' : ''}`}
      onClick={handleButtonClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="label">{label}</div>
      <div className={`circle ${isSelected ? 'selected' : ''}`}>
        {isSelected && <span className="checkmark">&#10003;</span>}
      </div>
    </button>
  );
};

export default CustomButton;
