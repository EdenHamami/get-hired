import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from "axios";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Timer from './Timer';
import './VirtualInterview.css';
import VideoCamera from './VideoCamera';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import './VirtualInterview.css';
import InterviewNavbar from './InterviewNavbar';


const VirtualInterview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPosition = location.state.selectedPosition;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [currentQuestion , setCurrentQuestion] = useState({});
  const [nextButton , setNextButton] = useState('next');
  const [isFinish, setIsFinish] =  useState(false);
  const [isStoped, setIsStoped] =  useState(false);
  
  const [modalIsOpen,setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }
  const handleNext = async ()  => {
    if (currentIndex === interviewQuestions.length - 1) {
      if(!isStoped){
        stopRecording();
      }
      setIsFinish(true)
      setNextButton('>')
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }

    if (isFinish){
      const blob = new Blob(recordedChunks, { type: 'video/mp4' });
      const formData = new FormData();
      console.log('formData:',formData)
      formData.append('video', blob, 'custom_video_name.mp4');
      const headers = { 'Authorization': `${localStorage.getItem('token')}` };
      if (true) {
        try {
          const response = await axios.post('http://127.0.0.1:3001/upload-video', formData,{ headers } );
          navigate('/LastPage', {
          state: {
            video_link: response.data
          }
        });
    } catch (error) {
          console.error('Error uploading video:', error);
        }
      }
    }
  };


  const handleAlert = () => {
    const result = window.confirm("Just like a real-life interview, you can't stop midway in this virtual interview. If you exit now, your recording will be discarded and you will be redirected to the main menu. Are you sure you want to proceed?");

    if (result) {
      navigate('/Menu');
    }
  };
  const videoRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      // poster: 'path/to/poster/image.jpg',
    });

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
    console.log(currentQuestion.videoUrl)
  }, [currentIndex, interviewQuestions, isDataFetched]);

  

  const [isRecording, setIsRecording] = useState(false);
  const videoRef1 = useRef();
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    startRecording();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef1.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing media devices.', err);
    }
  };


  const stopRecording = () => {
      setIsRecording(false);
      const tracks = videoRef1.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      mediaRecorderRef.current.stop();
      setRecordedChunks([]);
  };

  const downloadVideo = () => {
    const blob = new Blob(recordedChunks, { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'recorded-video.mp4';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  };
  
  const handleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="virtual-interview-page">
      <div className="interview-content">
        <div className="interview-column video-interviewer-container">
          <video ref={videoRef} className="video-js vjs-default-skin" src={currentQuestion.videoUrl} type="video/mp4" />
        </div>
        <div className="interview-column info-container">
          <div className="question">{currentQuestion.content}</div>
          <p className="instructions">When you finish, click {nextButton}</p>
          <div className="video-test-container">
            <video className="video-test" ref={videoRef1} autoPlay muted />
          </div>
        </div>
      </div>
      <div className="navbar-container">
        <InterviewNavbar 
          currentIndex={currentIndex} 
          questionsLength={interviewQuestions.length}
          handleNext={handleNext}
          nextButton={nextButton}
          handleAlert={handleAlert}
          handleRecording={handleRecording} 
          isRecording={isRecording}
        />
      </div>
    </div>
  );
};

export default VirtualInterview;