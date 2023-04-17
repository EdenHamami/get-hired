import {useEffect, useState} from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../App.css';
import * as React from "react";

function Opening() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/personal_table', {

    });
  };

  return (
    <div>
    <h6>Preparing for a job interview can be nerve-wracking, especially when 
    it comes to answering those tricky personal questions. 
    But don't worry, HIRE-HERO is here to 
    help! </h6><br></br>
    <h6>Our practice interview questions are designed to help you hone your 
    interview skills, build your confidence, and impress your potential 
    employer. From answering behavioral questions to showcasing your 
    problem-solving abilities, we've got a range of questions to help you 
    prepare for your next big interview. So why not give it a try and start 
    practicing today?
    You've got this!</h6>
    <button onClick={handleClick}>Lets start</button>
    </div>
  );
}

export default Opening;
