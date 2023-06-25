import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import * as React from "react";
import Navbar from "../src/components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faQuestionCircle,
  faSearch,
  faLightbulb,
  faUser,
  faMapSigns ,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import "./Menu.css";

function Menu() {
  const navigate = useNavigate();

  const navigate_resume = () => {
    navigate("/ResumePortfolio", {});
  };
  const navigate_career_plan = () => {
    navigate("/CareerPlanner", {});
  };

  const navigate_technical_questions = () => {
    navigate("/TechnicalPersonal", {});
  };
  const navigate_personal_questions = () => {
    navigate("/opening_personal_questions", {});
  };
  const navigate_tips = () => {
    navigate("/Tips", {});
  };
  const navigate_search_jobs = () => {
    navigate("/JobsSearch", {});
  };
  const navigate_job_interview = () => {
    navigate("/HelloJohn", {});
  };

  return (
    <div className="menu-container">
     
      <div className="content-container">
        <div className="image-container"></div>
        <div className="buttons-container">
          <div className="button-row">
            <button onClick={navigate_resume} className="menu-button">
              <FontAwesomeIcon icon={faFileAlt} className="icon" />
              <span>CV and portfolio</span>
            </button>
            <button onClick={navigate_technical_questions} className="menu-button">
              <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
              <span>Practice Interview Questions</span>
            </button>
            <button onClick={navigate_tips} className="menu-button">
              <FontAwesomeIcon icon={faLightbulb} className="icon" />
              <span>Tips and Tricks</span>
            </button>
          </div>
          <div className="button-row">
     
            <button onClick={navigate_search_jobs} className="menu-button">
              <FontAwesomeIcon icon={faSearch} className="icon" />
              <span>Search for jobs</span>
            </button>
            <button onClick={navigate_job_interview} className="menu-button">
              <FontAwesomeIcon icon={faVideo} className="icon" />
              <span>Virtual Job Interview</span>
            </button>
            <button onClick={navigate_career_plan} className="menu-button">
              <FontAwesomeIcon icon={faMapSigns} className="icon" /> 
              <span>Plan Your Career</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
