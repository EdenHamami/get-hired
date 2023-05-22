import React from 'react';
import "../styles/OpeningPage.css"
import { Link } from 'react-router-dom';
function OpeningPage() {
  return (
    <div className="start-page">
      <div className="start-page__overlay"></div>
      <div className="start-page__content">
        <Link to="/DesignSelectionPage">
        <button className="btn btn-primary">Get Started</button>
        </Link>
      </div>
    </div>   

  );
}

export default OpeningPage;