import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoInterviewer from './VideoInterviewer';

const HelloJohn = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ExplanationInterview', {
      state: {

      }
    });
  };

  return (
    <div>

    <h3>Hello, and welcome to your virtual job interview.
    I'm John, your interviewer from HIRE-HERO.
    Just like in a real interview, we don't have a
    pause button here.
    But don't worry, your preparation on our
    platform has equipped you well. </h3>

    <VideoInterviewer width="235" height="420" src="https://drive.google.com/uc?export=download&id=1UenqLwWUbEUP20HNzP3sgzX-_7frULem"  />
    <br />
    <button className="select-position-next-button" onClick={handleClick} >Let's get started</button>

    </div>
  );
};

export default HelloJohn;
