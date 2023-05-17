import React, { useState, useRef } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const TrialRecording = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef();
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const startRecording = async () => {
    setRecordedChunks([]);
    setIsRecording(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
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
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());

    mediaRecorderRef.current.stop();
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
    setRecordedChunks([]);
    setIsRecording(false);
  };

  const handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  };

  const handleClick = () => {
    navigate('/VirtualInterview', {
      state: {},
    });
  };

  const handleEditMicrophoneSettings = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      console.error('Error accessing microphone.', err);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      {!isRecording && <button onClick={startRecording}>Try recording here</button>}
      {isRecording && <button onClick={stopRecording}>Stop Recording</button>}
      {!isRecording && recordedChunks.length > 0 && <button onClick={downloadVideo}>Download Video</button>}
      <button onClick={handleClick}>Start the interview</button>
      <button onClick={handleEditMicrophoneSettings}>Edit Microphone Settings</button>
    </div>
  );
};

export default TrialRecording;
