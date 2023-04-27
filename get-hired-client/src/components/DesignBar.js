import React from 'react';
import "../styles/DesignBar.css"
const DesignBar = ({ designOptions, setDesignOptions }) => {
  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  return (
    <div className="design-bar">
      {designOptions.map((option, index) => (
        <div key={index} className="design-option">
          <label htmlFor={option.id}>{option.label}</label>
          {option.type === 'color' ? (
            <input
              type="color"
              id={option.id}
              value={option.value}
              onChange={(e) => handleChange(e, option.setter)}
            />
          ) : (
            <select
              id={option.id}
              value={option.value}
              onChange={(e) => handleChange(e, option.setter)}
            >
              {option.options.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

export default DesignBar;
