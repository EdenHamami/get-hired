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
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import "./Menu.css";

function Menu() {
  const navigate = useNavigate();

  const navigate_resume = () => {
    navigate("/OpeningPage", {});
  };

  const navigate_technical_questions = () => {
    navigate("/select_topics", {});
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
    navigate("/opening_personal_questions", {});
  };

  return (
    <div className="menu-container">
      <Navbar></Navbar>
      <div className="content-container">
        <div className="image-container"></div>
        <div className="buttons-container">
          <div className="button-row">
            <button onClick={navigate_resume} className="menu-button">
              <FontAwesomeIcon icon={faFileAlt} className="icon" />
              <span>Create your resume</span>
            </button>
            <button onClick={navigate_technical_questions} className="menu-button">
              <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
              <span>Technical Questions</span>
            </button>
            <button onClick={navigate_personal_questions} className="menu-button">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <span>Personal Questions</span>
            </button>
          </div>
          <div className="button-row">
            <button onClick={navigate_tips} className="menu-button">
              <FontAwesomeIcon icon={faLightbulb} className="icon" />
              <span>Tips and Tricks</span>
            </button>
            <button onClick={navigate_search_jobs} className="menu-button">
              <FontAwesomeIcon icon={faSearch} className="icon" />
              <span>Search for vacancies</span>
            </button>
            <button onClick={navigate_job_interview} className="menu-button">
              <FontAwesomeIcon icon={faVideo} className="icon" />
              <span>Virtual Job Interview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
