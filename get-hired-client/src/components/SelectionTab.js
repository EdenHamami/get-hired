import React, { useState } from 'react';
import './SelectionTab.css';

const SelectionTab = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  return (
    <div className="selection-tab">
      <div className="selection-dropdown">
        <div className="selected-option" onClick={() => setShowOptions(!showOptions)}>
          <span>{selectedOption || 'Select an option'}</span>
          <div className="dropdown-arrow"></div>
        </div>
        {showOptions &&
          <ul className="option-list">
            {options.map((option) => (
              <li key={option} onClick={() => handleOptionSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
};

export default SelectionTab;
