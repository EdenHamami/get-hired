import React, { useContext } from 'react';
import { ResumeContext } from "../../../context/ResumeContext";
import './Summary.css';

function Summary() {
  const { summary, setSummary } = useContext(ResumeContext);

  const handleInputChange = (e) => {
    setSummary(e.target.value);
  };

  return (
    <div className="summary_input">
      <h3 className="summary__header">Summary</h3>
      <div className="summary__content">
        <textarea
          className="summary__textarea"
          name="summary"
          value={summary}
          onChange={handleInputChange}
          placeholder="Write a summary of your skills and experience here"
        />
      </div>
    </div>
  );
}

export default Summary;
