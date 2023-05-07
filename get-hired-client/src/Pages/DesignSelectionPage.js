import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import design1 from '../images/design1.jpg';
import design2 from '../images/design2.jpg';
import design3 from '../images/design3.jpg';
import { ResumeContext } from '../context/ResumeContext';
import "../styles/DesignSelectionPage.css"
import Navbar from '../components/Navbar';
import titleImage from './designSelection.jpg'; // Add this import for the title image

const DesignSelectionPage = () => {
  
  const { setTemplateId } = useContext(ResumeContext);


  const handleSelectTemplate = (templateId) => {
    setTemplateId(templateId);
  };
  

  return (
    <div className="design-selection-page">
      <Container >
        <Row className="justify-content-center">
          <Col xs={12} className="my-3">
          <img src={titleImage} alt="Title" className="designSelection-title-image" /> {/* Use img element to display the title image */}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} className="my-3">
            <div className="design-options-grid">
              <div className="design-option">
              <Link to="/ResumeCreationPage" onClick={() => handleSelectTemplate(1)}>
                  <div className="design-image-container">
                    <Image src={design1} thumbnail className="design-image" />
                    <div className="overlay">Select Design 1</div>
                  </div>
                  <div className="design-name">Design 1</div>
                </Link>
              </div>
              <div className="design-option">
              <Link to="/ResumeCreationPage" onClick={() => handleSelectTemplate(2)}>
                    <div className="design-image-container">
                    <Image src={design2} thumbnail className="design-image" />
                    <div className="overlay">Select Design 2</div>
                  </div>
                  <div className="design-name">Design 2</div>
                </Link>
              </div>
              <div className="design-option">
              <Link to="/ResumeCreationPage" onClick={() => handleSelectTemplate(3)}>
                  <div className="design-image-container">
                    <Image src={design3} thumbnail className="design-image" />
                    <div className="overlay">Select Design 3</div>
                  </div>
                  <div className="design-name">Design 3</div>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
     
      </Container>
    </div>
  );
  
  
};

export default DesignSelectionPage;
