import React from 'react';
import { Link } from 'react-router-dom';
function technicalQuestionsIntro() {
  return (
    <div className="start-page">
      <div className="start-page__overlay"></div>
      <div className="start-page__content">
        <Link to="/DesignSelectionPage">
        <button className="start-page__button">Get Started</button>
        </Link>
      </div>
    </div>   

  );
}

export default technicalQuestionsIntro;