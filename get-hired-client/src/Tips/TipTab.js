import React from 'react';
import './TipTab.css';

const TipTab = ({ tip, active, onClick, index }) => {
  return (
    <div
      className={`tip-tab ${active ? 'active-tip-tab' : ''}`}
      onClick={onClick}
    >
      <div className="tip-index">{index + 1}</div>
      <div className="tip-tab-content">
        <h3>{tip.title}</h3>
        <p>{tip.content}</p>
      </div>
    </div>
  );
};

export default TipTab;
