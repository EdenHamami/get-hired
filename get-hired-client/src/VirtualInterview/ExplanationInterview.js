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
<VideoInterviewer width="235" height="420" src="https://drive.google.com/uc?export=download&id=1JqWH8Y2h4sK5Zz6s32ON7FPErL7n_jLs" />
</div>
<div className="text-container">

    <h3>In this interview,<br/>
    I'll ask you five key questions.<br/>
    You'll respond to each question after I ask it.<br/>
    Your interview will be recorded-<br/>so make sure
    your camera and environment are set.<br/>
    There are no do-overs or skipping here,<br/>
    just like in a real interview.<br/><br/>
    <b> So, bring your best,<br/> 
   just like the hero you are!</b> </h3>
    <button className="btn btn-primary" onClick={handleClick} >next</button>

</div>

    </div>
  );
};

export default ExplanationInterview;
