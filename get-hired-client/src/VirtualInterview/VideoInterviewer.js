import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoInterviewer = (props) => {
  const { width, height, src } = props;
  const videoRef = useRef(null);
  const [showRestartButton, setShowRestartButton] = useState(false);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: false, // Disable controls
      autoplay: true,
      preload: 'auto',
    });

    player.on('ended', () => {
      setShowRestartButton(true);
    });

    return () => {
      player.dispose();
    };
  }, []);

  const restartVideo = () => {
    setShowRestartButton(false);
    const player = videojs(videoRef.current);
    player.currentTime(0); // Rewind the video to the beginning
    player.play(); // Start playing again
  };

  const navigate = useNavigate();

  return (
    <div>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        width={width}
        height={height}
        src={src}
        type="video/mp4"
      />

      {showRestartButton && (
        <button onClick={restartVideo}>Restart Video</button>
      )}
    </div>
  );
};

export default VideoInterviewer;