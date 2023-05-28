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
        <VideoInterviewer className="john-video"  src="https://drive.google.com/uc?export=download&id=1UenqLwWUbEUP20HNzP3sgzX-_7frULem"  />
      </div>

      <div className="text-container">
        {accumulatedSubtitles.map((subtitle, index) => (
          <h3 key={index}>{subtitle}</h3>
        ))}
        <button className="btn btn-primary" onClick={handleClick} >Let's get started</button>
      </div>

    </div>
  );
};

export default HelloJohn;
