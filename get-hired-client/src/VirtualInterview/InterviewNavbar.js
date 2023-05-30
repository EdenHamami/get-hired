import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash, faCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './InterviewNavbar.css';

const InterviewNavbar = ({currentIndex, questionsLength, handleNext, handleAlert, handleRecording}) => {
    return (
        <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Nav>
                <Button variant="danger" className="rounded-pill mr-2" onClick={handleAlert}>End</Button>
                <Button variant="outline-light" className="rounded-circle" onClick={handleRecording}>
                    <FontAwesomeIcon icon={faVideoSlash} />
                </Button>
            </Nav>

            <Nav>
                {Array.from({length: questionsLength}, (_, i) => (
                    <FontAwesomeIcon 
                        key={i} 
                        icon={faCircle} 
                        className={`mr-1 ${currentIndex === i ? 'active-question' : 'inactive-question'}`} 
                    />
                ))}
            </Nav>

            <Nav>
                <Button variant="primary" className="rounded-pill" onClick={handleNext}>
                    Next <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            </Nav>
        </Navbar>
    );
}

export default InterviewNavbar;
