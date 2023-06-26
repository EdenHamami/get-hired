import React, { useState, useRef, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import MicrophoneTest from './MicrophoneTest';
import VideoInterviewer from './VideoInterviewer';
import { Container } from '@material-ui/core';
import "./TrialRecording.css"
const TrialRecording = () => {
  const location = useLocation();
  const selectedPosition = location.state.selectedPosition;

  const navigate = useNavigate();

  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef();
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    const performRecording = async () => {
      await startRecording();
      setTimeout(() => {
        stopRecording();
      }, 30); // Delay of 1000 milliseconds (adjust as needed)
    };
    performRecording();
  }, []);

  const startRecording = async () => {

    setIsRecording(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing media devices.', err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());

    mediaRecorderRef.current.stop();
    
  };

  const handleClick = () => {
    navigate('/VirtualInterview', {
      state: {
        selectedPosition: selectedPosition
      },
    });
  };

  return (
    <div className="main-container">
      <div className="video-container">
        <VideoInterviewer width="235" height="420" src={require('./videos-interviewer/page4.mp4')}  />
      </div>
      <div className="text-container">

        <h3><b>Before we begin-please ensure your camera and audio settings are perfectly
        set</b></h3>
        <div>We want you to be seen and heard clearly.</div> 
        <div><b>Remember, first-impressions matter!</b></div>

          {!isRecording && <button className="btn btn-primary" id="on-off" onClick={startRecording}><FontAwesomeIcon icon={faVideoSlash} /></button>}
          {isRecording && <button className="btn btn-primary" id="on-off" onClick={stopRecording}><FontAwesomeIcon icon={faVideo} /></button>}

        <div className='controls-container'> 
          <video className="video-test" ref={videoRef} autoPlay muted  />
         <MicrophoneTest />
        </div>
        
        <button className="btn btn-primary" onClick={handleClick}>next</button>
      </div>
    </div>
);

};

export default TrialRecording;
