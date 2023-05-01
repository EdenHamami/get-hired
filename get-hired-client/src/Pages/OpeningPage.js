import React from 'react';
import "../styles/OpeningPage.css"
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
function OpeningPage() {
  return (
    <div>            <Navbar></Navbar>
    <div className="start-page">
      <div className="start-page__overlay"></div>
      <div className="start-page__content">
        <Link to="/DesignSelectionPage">
        <button className="btn-custom">Get Started</button>
        </Link>
      </div>
    </div>    </div>

  );
}

export default OpeningPage;