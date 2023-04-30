import React from 'react';
import './InputField.css';

const InputField = ({ placeholder }) => {
  return (
    <input className="input-field" placeholder={placeholder} />
  );
};

export default InputField;
