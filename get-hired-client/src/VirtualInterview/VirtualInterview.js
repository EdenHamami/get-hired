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


const VirtualInterview = () => {
  const navigate = useNavigate();
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
    console.log(currentQuestion.videoUrl)
  }, [currentIndex, interviewQuestions, isDataFetched]);

  const handleNext = async ()  => {
    if (currentIndex === interviewQuestions.length - 1) {
      await stopRecording();
      const blob = new Blob(recordedChunks, { type: 'video/mp4' });
      navigate('/LastPage', {
        state: {
          blob: blob
        }
      });
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = currentQuestion.videoUrl;
    a.download = 'interview_video.mp4';
    a.click();
  };

  const handleAlert = () => {
    const result = window.confirm("Eden needs to write");

    if (result) {
      navigate('/Menu');
    } 
    else {
    }
  };



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

  
  return (
    <div>
    <Timer />
    <h3> {currentQuestion.content}</h3>
    <h4>When you finish, click {nextButton}</h4>
    <button onClick={handleNext}>{nextButton}</button>
    <video ref={videoRef} className="video-js vjs-default-skin" width="640" height="480" src={currentQuestion.videoUrl} type="video/mp4" />
    {interviewQuestions.map((item, index) => (
      <span key={index} className={currentIndex === index ? 'active-button' : ''}>{index + 1}</span>

    ))}
    <button onClick={handleAlert}>end</button>
    
    <video ref={videoRef1} autoPlay muted />
      {!isRecording && (
        <button className="btn btn-primary" id="on-off" onClick={startRecording}><FontAwesomeIcon icon={faVideoSlash} /></button>
      )}
      {isRecording && (
        <button className="btn btn-primary" id="on-off" onClick={stopRecording}><FontAwesomeIcon icon={faVideo} /></button>
      )}
    </div>
  );
};

export default VirtualInterview;
