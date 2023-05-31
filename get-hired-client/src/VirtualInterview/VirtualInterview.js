import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from "axios";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Timer from './Timer';
import VideoCamera from './VideoCamera';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import './VirtualInterview.css';
import InterviewNavbar from './InterviewNavbar';
import Modal from 'react-modal';

const VirtualInterview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPosition = location.state.selectedPosition;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [currentQuestion , setCurrentQuestion] = useState({});
  const [nextButton , setNextButton] = useState('next');
  const [modalIsOpen,setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  const handleNext = async ()  => {
    if (currentIndex === interviewQuestions.length - 1) {
      openModal();
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
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
    console.log(currentQuestion.videoUrl)
  }, [currentIndex, interviewQuestions, isDataFetched]);

  // const handleNext = async ()  => {
  //   if (currentIndex === interviewQuestions.length - 1) {
  //     await stopRecording();
  //     const blob = new Blob(recordedChunks, { type: 'video/mp4' });
  //     navigate('/LastPage', {
  //       state: {
  //         blob: blob
  //       }
  //     });
  //   } else {
  //     setCurrentIndex(prevIndex => prevIndex + 1);
  //   }
  // };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = currentQuestion.videoUrl;
    a.download = 'interview_video.mp4';
    a.click();
  };
  // const handleAlert = () => {
  //   const result = window.confirm("Just like a real-life interview, you can't stop midway in this virtual interview. If you exit now, your recording will be discarded and you will be redirected to the main menu. Are you sure you want to proceed?");

  //   if (result) {
  //     navigate('/Menu');
  //   }
  // };



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
    setRecordedChunks([])
    console.log(recordedChunks)
    console.log("her1")
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

  const handleUpload  = async () => {
    

    // // Create a FormData object and append the Blob to it
    // const formData = new FormData();
    // formData.append('video', blob, 'custom_video_name.mp4');
    // if (true) {
    //   try {
    //     const response = await axios.post('http://127.0.0.1:3001/upload-video', formData);

    //     if (response.status === 200) {
    //       console.log(response.data);
    //     } else {
    //       console.error('Failed to upload video.');
    //     }
    //   } catch (error) {
    //     console.error('Error uploading video:', error);
    //   }
    // }
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
      <div className="info-container">
        <p className="question">{currentQuestion.content}</p>
        <p className="instructions">When you finish, click {nextButton}</p>
      </div>
      <div className="video-container">
        <video ref={videoRef} className="video-js vjs-default-skin" width="640" height="480" src={currentQuestion.videoUrl} type="video/mp4" />
        <video ref={videoRef1} autoPlay muted />
      </div>
      <div className="navbar-container">
        <InterviewNavbar 
          currentIndex={currentIndex} 
          questionsLength={interviewQuestions.length}
          handleNext={handleNext}
          handleAlert={handleAlert}
          handleRecording={handleRecording} 
          isRecording={isRecording}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="End Interview Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Are you sure you want to finish?</h2>
        <p>Just like a real-life interview, you can't stop midway in this virtual interview. If you exit now, your recording will be discarded and you will be redirected to the main menu.</p>
        <button onClick={handleAlert}>Yes, I want to finish</button>
        <button onClick={closeModal}>No, let me continue</button>
      </Modal>
    </div>
  );
  
};

export default VirtualInterview;