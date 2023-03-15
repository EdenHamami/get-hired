import {useEffect, useState} from "react";

import axios from "axios";
import './App.css';
import * as React from "react";
import { Link, Route, Routes } from "react-router-dom";

import ReactDOM from 'react-dom';
import RegistrationPage from './RegistrationPage';
import SuccessfulRegistrationPage from './SuccessfulRegistrationPage';


function Questions() {

  const question1 = {
    id: '641192df318c49a618ac0d37',
  }
  const question2 = {
    id: '640e08610999a23ce2deda8b',
  }
  const question3 = {
    id: '640edc8a680d709e8e544f0e',
  }

  return (
 
    <div>
      <div>
      <Link to="/online_compiler" state={question1}>question1</Link><br></br>
      <Link to="/online_compiler" state={question2}>question2</Link><br></br>
      <Link to="/online_compiler" state={question3}>question3</Link>
      </div>
    </div>
  );
}

export default Questions;
