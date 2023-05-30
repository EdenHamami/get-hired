import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'video.js/dist/video-js.css';
import VideoInterviewer from './VideoInterviewer';
import './HelloJohn.css';



// need to put current intretviewer video !!!!
const Page5 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPosition = location.state.selectedPosition;

  const [index, setIndex] = useState(0);
  const subtitles = [
    "We're all set!",
    "I'm John, your HIRE-HERO interviewer.",
    "You're about to answer 5 common interview",
    "questions.",
    "This is your time to shine.",
    "When you're ready,",
    "click the button to start the interview."
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
    navigate('/VirtualInterview', {
      state: {
        selectedPosition: selectedPosition
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
        <button className="btn btn-primary" onClick={handleClick} >I’m ready!</button>
      </div>

    </div>
  );
};

export default Page5;
