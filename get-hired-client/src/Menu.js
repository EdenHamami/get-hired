
import {useEffect, useState} from "react";
import { Link, Route, Routes ,useLocation , useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './App.css';
import * as React from "react";

function Menu() {

  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/select_topics', {

    });
  };

  const handleClick2 = () => {
    navigate('/opening_personal_questions', {

    });
  };

  return (
    <div>
      <button onClick={handleClick1}>technical questions</button>
      <button onClick={handleClick2}>personal questions</button>
    </div>
  );
}

export default Menu;
