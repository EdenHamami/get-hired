import React, { useRef, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'video.js/dist/video-js.css';
import VideoInterviewer from './VideoInterviewer';
import './HelloJohn.css';
import videojs from 'video.js';
import axios from "axios";



// need to put current intretviewer video !!!!
const LastPage = () => {

  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const blob = location.state.blob;

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
  
  const downloadVideo = async () => {
    // Create a FormData object and append the Blob to it
    const formData = new FormData();
    formData.append('video', blob, 'custom_video_name.mp4');
    if (true) {
      try {
        const response = await axios.post('http://127.0.0.1:3001/upload-video', formData);

        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.error('Failed to upload video.');
        }
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    }
  };

  const handleClick = () => {
    navigate('/Menu');
  };

  return (
    <div >

      <h3>Great job completing your virtual job interview on HIRE-HERO! 
      Below is a video of your performance. Use it as a learning tool to refine your interview skills 
      and grow.</h3>
      <video ref={videoRef} className="video-js vjs-default-skin" width="640" height="480" src="https://drive.google.com/uc?export=download&id=1VPalfftzbruc3QBcC8huCaSxjGF-fdT4" type="video/mp4" />
        <button onClick={downloadVideo}>
          Download Video
        </button>
        
        <h3>The video will be saved here on our platform for you to review anytime. If you wish to share it 
        with friends or mentors, simply download it with the 'Download' button below.</h3>
        <button className="btn btn-primary" onClick={handleClick} >Home page</button>
    </div>
  );
};

export default LastPage;
