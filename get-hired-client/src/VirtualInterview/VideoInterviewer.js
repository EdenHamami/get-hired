import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoInterviewer = (props) => {
  const { width, height, src } = props;
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

  const navigate = useNavigate();

  return (
    <div>


    <video ref={videoRef} className="video-js vjs-default-skin" width={width} height={height} src={src} type="video/mp4" />


    </div>
  );
};

export default VideoInterviewer;
