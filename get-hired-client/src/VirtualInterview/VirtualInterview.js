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
import Modal from 'react-modal';

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
  function closeModal(){
    setIsOpen(false);
    navigate('/Menu');
  }

  const handleAlert = () => {
    setIsOpen(true);
  };
  const handleNext = async () => {
    if (currentIndex === interviewQuestions.length - 1) {
      if (!isStoped) {
        stopRecording();
      }
      setTimeout(() => {
        setIsFinish(true);
      }, 30);
      
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };
  
  const uploadVideo = async () => {
    const blob = new Blob(recordedChunks, { type: 'video/mp4' });
    const formData = new FormData();
    formData.append('video', blob, 'custom_video_name.mp4');
    const headers = { 'Authorization': `${localStorage.getItem('token')}` };
  
    try {
      const response = await axios.post('http://127.0.0.1:3001/upload-video', formData, { headers });
      navigate('/LastPage', {
        state: {
          video_link: response.data
        }
      });
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };
  
  useEffect(() => {
    if (isFinish) {
      uploadVideo();
    }
  }, [isFinish]);

  // const handleAlert = () => {
  //   const result = window.confirm("Just like a real-life interview, you can't stop midway in this virtual interview. If you exit now, your recording will be discarded and you will be redirected to the main menu. Are you sure you want to proceed?");
  //   if (result) {
  //     navigate('/Menu');
  //   } 
  //   else {
  //   }
  // };
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
      setIsStoped(false)
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
      setIsStoped(true)
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
      <Modal 
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  style={{
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
      position: 'relative',
      width: '40%', // reduce the width
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      textAlign: 'center',
      color: 'black'
    }
  }}
  contentLabel="Exit Confirmation Modal"
  ariaHideApp={false}
>
  <h2 style={{ fontSize: '18px' }}>Just like a real-life interview, you can't stop midway in this virtual interview. If you exit now, your recording will be discarded and you will be redirected to the main menu.<br/> Are you sure you want to proceed?</h2>
  <button onClick={closeModal} style={{ backgroundColor: 'purple', color: 'white', padding: '10px 20px', borderRadius: '5px', margin: '10px' }}>Yes, I'm sure</button>
  <button onClick={() => setIsOpen(false)} style={{ backgroundColor: 'grey', color: 'white', padding: '10px 20px', borderRadius: '5px', margin: '10px' }}>Back to the interview</button>
</Modal>
    </div>
  );
};
export default VirtualInterview;