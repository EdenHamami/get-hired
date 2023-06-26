import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import './InterviewNavbar.css';
import Timer from './Timer';
import VirtualInterview from "./VirtualInterview"
import { stopRecording, startRecording } from "./VirtualInterview"

const InterviewNavbar = ({ currentIndex, questionsLength, handleNext, nextButton, handleAlert, handleRecording, isRecording }) => {
  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between interview-navbar">
      <Nav>
        <Button variant="danger" className="rounded-pill mr-2" onClick={handleAlert}>End</Button>

        <Timer />
      </Nav>
      <Nav className="question-indicators">
        {[...Array(questionsLength)].map((_, i) => (
          <span key={i} className={currentIndex === i ? 'active-question' : 'inactive-question'}>{i + 1}</span>
        ))}
      </Nav>
      <Nav>
        <Button variant="outline-light" className="rounded-pill next-button" onClick={handleNext}>{nextButton}</Button>
      </Nav>
    </Navbar>
  );
};

export default InterviewNavbar;
