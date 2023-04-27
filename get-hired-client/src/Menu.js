
import {useEffect, useState} from "react";
import { Link, Route, Routes ,useLocation , useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './App.css';
import * as React from "react";

function Menu() {

  const navigate = useNavigate();

  const navigate_resume = () => {
    navigate('/OpeningPage', {

    });
  };

  const navigate_technical_questions = () => {
    navigate('/select_topics', {

    });
  };
  const navigate_personal_questions = () => {
    navigate('/opening_personal_questions', {

    });
  };
  const navigate_tips = () => {
    navigate('/opening_personal_questions', {

    });
  };
  const navigate_search_jobs = () => {
    navigate('/JobsSearch', {

    });
  };
  const navigate_job_interview = () => {
    navigate('/opening_personal_questions', {

    });
  };

  return (
    <div>
      <button onClick={navigate_resume}>Create your resume</button>
      <button onClick={navigate_technical_questions}>Technical Questions</button>
      <button onClick={navigate_personal_questions}>Personal Questions</button>
      <button onClick={navigate_tips}>Tips And Tricks</button>
      <button onClick={navigate_search_jobs}>Search Jobs</button>
      <button onClick={navigate_job_interview}>Virtual Job Interview</button>
      
    </div>
  );
}

export default Menu;
