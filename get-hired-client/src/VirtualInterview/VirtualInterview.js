import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Timer from './Timer';
import VideoCamera from './VideoCamera';

import "./VirtualInterview.css";

const VirtualInterview = () => {
  const location = useLocation();
  const selectedPosition = location.state.selectedPosition;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [currentQuestion , setCurrentQuestion] = useState({});
  const [nextButton , setNextButton] = useState('next');


  const videoRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      poster: 'path/to/poster/image.jpg',
    });

    // player.on('ended', () => {
    //   player.currentTime(0);
    // });

    return () => {
      player.dispose();
    };
  }, []);

  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    axios.post(`http://127.0.0.1:3001/interview-question/${selectedPosition}`)
      .then((response) => {
        console.log(response.data.questions);
        setInterviewQuestions(response.data.questions);
        setCurrentQuestion(response.data.questions[0]);
        setIsDataFetched(true);
      })
      .catch((error) => {
        console.error('Error fetching video URL:', error);
      });
  }, []);

  useEffect(() => {
    if (currentIndex === interviewQuestions.length - 1) {
      setNextButton('finish');
    } else {
      setNextButton('next');
    }
  }, [currentIndex]);
  
  useEffect(() => {
    if (isDataFetched) {
      console.log(interviewQuestions);
      setCurrentQuestion(interviewQuestions[currentIndex]);
    }
  }, [currentIndex, interviewQuestions, isDataFetched]);

  const handleNext = () => {
    if (currentIndex == interviewQuestions.length-1){
      console.log("finish!")
    }
    else{setCurrentIndex((prevIndex) =>{
        const updatedIndex = (prevIndex + 1) 
        return updatedIndex;
      }
   ) };
 
  };
  
  return (
    <div>
    <Timer />
    <h3> {currentQuestion.content}</h3>
    <button onClick={handleNext}>{nextButton}</button>
    <video ref={videoRef} className="video-js vjs-default-skin" width="640" height="480" src={currentQuestion.videoUrl} type="video/mp4" />
    {interviewQuestions.map((item, index) => (
      <button key={index} onClick={() => setCurrentIndex(index)} className={currentIndex === index ? 'active-button' : ''}>
        {index + 1}
      </button>
    ))}
    <VideoCamera/>
    </div>
  );
};

export default VirtualInterview;
