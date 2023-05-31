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
  const video_link = 'https://drive.google.com/uc?export=download&id=' + location.state.video_link;

  useEffect(() => {
    console.log(video_link)
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      // poster: 'path/to/poster/image.jpg',
    });

    // player.on('ended', () => {
    //   player.currentTime(0);
    // });

    return () => {
      player.dispose();
    };
  }, []);
      
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = video_link;
    a.download = 'interview_video.mp4';
    a.click();
  };

  const handleClick = () => {
    navigate('/Menu');
  };

  return (
    <div >

      <h3>Great job completing your virtual job interview on HIRE-HERO! 
      Below is a video of your performance. Use it as a learning tool to refine your interview skills 
      and grow.</h3>
      <video ref={videoRef} className="video-js vjs-default-skin" width="640" height="480" src={video_link} type="video/mp4" />
        <button onClick={handleDownload}>
          Download Video
        </button>
        
        <h3>The video will be saved here on our platform for you to review anytime. If you wish to share it 
        with friends or mentors, simply download it with the 'Download' button below.</h3>
        <button className="btn btn-primary" onClick={handleClick} >Home page</button>
    </div>
  );
};

export default LastPage;
