import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import 'video.js/dist/video-js.css';

const VideoCamera = () => {
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


  return (
    <div>
      <video ref={videoRef1} autoPlay muted />
      {!isRecording && (
        <button onClick={startRecording}>
          Start Recording
        </button>
      )}
      {isRecording && (
        <button onClick={stopRecording}>
          Stop Recording
        </button>
      )}
      {!isRecording && recordedChunks.length > 0 && (
        <button onClick={downloadVideo}>
          Download Video
        </button>
      )}
    </div>
  );
};

export default VideoCamera;
