import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import design1 from '../images/design1.jpg';
import design2 from '../images/design2.jpg';
import design3 from '../images/design3.jpg';
import { ResumeContext } from '../context/ResumeContext';
import "../styles/DesignSelectionPage.css"
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
            <h2>Choose your favorite design:</h2>
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
        <Row className="justify-content-center">
          <Col xs={10} sm={6} md={4} className="my-3">
            <Button variant="outline-secondary" className="w-100 back-button" onClick={() => console.log('back clicked')}>Back</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
  
  
};

export default DesignSelectionPage;
