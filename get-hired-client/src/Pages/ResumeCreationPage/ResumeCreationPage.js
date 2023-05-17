import React from 'react';
import LeftSide from './LeftSide/LeftSide';
import RightSide from './RightSide';
import "../../styles/ResumeCreationPage.css"
import Navbar from '../../components/Navbar';
function ResumeCreationPage() {
  return (
    <div className="resume-creation-page">
      <div className="left-side-wrapper">
        <LeftSide />
      </div>
      <div className="right-side-wrapper">
        <RightSide />
      </div>
    </div>
  );
}

export default ResumeCreationPage;
