import React, { useRef, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'video.js/dist/video-js.css';
import VideoInterviewer from './VideoInterviewer';
import './HelloJohn.css';
import videojs from 'video.js';
import axios from "axios";
import "./LastPage.css"

const LastPage = () => {

  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const video_link = 'https://drive.google.com/uc?export=download&id=' + location.state.video_link;

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
    });

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
    <div className="last-page">
      <div className="last-page-container-image"></div>
      <div className='right-container'> 
        <div className='header'>
          <img src='./LastPageTitle.png' className='header-image'></img>
        </div>
        <div className='video-download-container'>
          <video ref={videoRef} className="video-js vjs-default-skin" width="640" height="400" src={video_link} type="video/mp4" />
          <button className='btn btn-primary' onClick={handleDownload}>
            Download Video
          </button>
        </div>
        <div className='text'>
          <h3 className='video-text'>The video will be saved here on our platform for you to review anytime.<br/> If you wish to share it with friends or mentors, simply download it with the 'Download' button below.</h3>
        </div>
      </div>
    </div>
  );
};

export default LastPage;
