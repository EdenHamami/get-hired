import React, {  useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoInterviewer from './VideoInterviewer';
import "./ExplanationInterview.css"

const ExplanationInterview = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/selectPosition', {
      state: {

      }
    });
  };

  return (
<div className="main-container">
<div className="video-container">
<VideoInterviewer width="235" height="420" src={require('./videos-interviewer/page2.mp4')} />
</div>

<div className="text-container">
    <h4><b>In this interview,I'll ask you five key questions.</b></h4>
    <h4> You'll respond to each question after I ask it</h4>
    <div>Your interview will be recorded- <br/>
    so make sure your camera and environment are set.</div>
    <div>  There are no do-overs or skipping here, <br/>
    just like in a real interview.</div>
     <b>So, bring your best- just like the hero you are!</b>
     <button className="btn btn-primary" onClick={handleClick} >next</button>

      </div>
    </div>
  );
};

export default ExplanationInterview;
