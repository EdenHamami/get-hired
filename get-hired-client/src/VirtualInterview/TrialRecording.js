import React, { useState, useRef, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import MicrophoneTest from './MicrophoneTest';
import VideoInterviewer from './VideoInterviewer';

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
    <div>
    <h3>Before we begin,
      please ensure your camera and audio settings are perfectly
      set.
      We want you to be seen and heard clearly. Remember, first
      impressions matter!</h3>
      <VideoInterviewer width="235" height="420" src="https://drive.google.com/uc?export=download&id=1-OlwazVbzxh4WyQhfcfcXy5Tkyb3s7IK"  />
      <video ref={videoRef} autoPlay muted  /><br></ br>
      
      {!isRecording && <button onClick={startRecording}><FontAwesomeIcon icon={faVideoSlash} /></button>}
      {!isRecording && <button onClick={startRecording}>Start video</button>}
      {isRecording && <button onClick={stopRecording}><FontAwesomeIcon icon={faVideo} /></button>}
      {isRecording&& <button onClick={stopRecording}>Stop video</button>}
      <MicrophoneTest/>
      <button onClick={handleClick}>next</button>

    </div>
  );
};

export default TrialRecording;
