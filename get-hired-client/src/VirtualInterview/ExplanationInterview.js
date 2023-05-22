import React, {  useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoInterviewer from './VideoInterviewer';

const ExplanationInterview = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/selectPosition', {
      state: {

      }
    });
  };

  return (
    <div>

    <h3>In this interview,
    I'll ask you five key questions.
    You'll respond to each question after I ask it.
    Your interview will be recorded, so make sure
    your camera and environment are set.
    There are no do-overs or skipping here,
    just like in a real interview.
    So, bring your best, just like the hero you are! </h3>

    <VideoInterviewer width="235" height="420" src="https://drive.google.com/uc?export=download&id=1JqWH8Y2h4sK5Zz6s32ON7FPErL7n_jLs" />
    <br />
    <button className="select-position-next-button" onClick={handleClick} >next</button>

    </div>
  );
};

export default ExplanationInterview;
