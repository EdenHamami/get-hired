import React from 'react';
import './SummaryBlock.css';

const SummaryBlock = ({ summary, template,header }) => {
  return (
    <div className={`summary-${template}`}>
      <h2>{header}</h2>
      <p className='summary'>{summary}</p>
    </div>
  );
};

export default SummaryBlock;
