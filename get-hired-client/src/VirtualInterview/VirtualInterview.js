import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import YouTube from 'react-youtube';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Timer from './Timer';

const VirtualInterview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const videoRef1 = useRef();
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");

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
  

  useEffect(() => {
    startRecording();
    const Id = '6460de43278574efe5c98689';
    axios.post(`http://127.0.0.1:3001/interview-question/${Id}`)
      .then((response) => {
        console.log(response.data.videoUrl);
        setVideoUrl(response.data.videoUrl);
      })
      .catch((error) => {
        console.error('Error fetching video URL:', error);
      });
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
    <Timer />
      <video ref={videoRef} className="video-js vjs-default-skin" width="640" height="480" src={videoUrl} type="video/mp4" />
    
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

export default VirtualInterview;
