import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoInterviewer from './VideoInterviewer';
import './HelloJohn.css';

const HelloJohn = () => {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const subtitles = [
    "Hello, and welcome to your virtual job interview.",
    "I'm John, your interviewer from HIRE-HERO.",
    "Just like in a real interview, we don't have a pause button here.",
    "But don't worry, your preparation on our platform has equipped you well."
  ];
  const [accumulatedSubtitles, setAccumulatedSubtitles] = useState([subtitles[0]]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex < subtitles.length) {
          setAccumulatedSubtitles((prevSubtitles) => [...prevSubtitles, subtitles[newIndex]]);
          return newIndex;
        } else {
          clearInterval(interval);
        }
        return prevIndex;
      });
    }, 5000); // adjust this time to change the speed of changing subtitles
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    navigate('/ExplanationInterview', {
      state: {

      }
    });
  };

  return (
    <div className="main-container">

      <div className="video-container">
        <VideoInterviewer className="john-video"  src={require('./videos-interviewer/page1.mp4')}  />
      </div>

      <div className="text-container">
      <h3 className='welcome'> <b>Hello, and welcome to your virtual job interview.</b></h3>
    <h4><b>I'm John, your interviewer from HIRE-HERO</b></h4>
    <div>Just like in a real interview, we don't have a pause button here <br/>
    But don't worry</div>
     <b>your preparation on our platform has equipped you well</b>
     <button className="btn btn-primary" onClick={handleClick} >next</button>

      </div>
    </div>
  );
};

export default HelloJohn;
