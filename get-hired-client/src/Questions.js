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
    id: '6411b43d4c5087e25b92bbd8',
  }
  const question3 = {
    id: '6411b436b8d7afb7435742a7',
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
