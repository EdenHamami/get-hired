import React from 'react';
import './TipTab.css';

const TipTab = ({ tip, active, onClick }) => {
  return (
    <div className={`tab ${active ? 'large-tab' : ''}`} onClick={onClick}>
      <img src={tip.img} alt={tip.title} className="tip-image" />
      <h2 className="tab-title">{tip.title}</h2>
      <p className="tab-content">{tip.content}</p>
    </div>
  );
};

export default TipTab;
