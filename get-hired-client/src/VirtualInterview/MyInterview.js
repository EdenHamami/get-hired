import { useLocation } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import videojs from 'video.js';
import VideoInterviewer from "./VideoInterviewer"
import "./MyInterview.css"

function MyInterview() {
  const location = useLocation();
  const videoRef = useRef(null);

  const [myInterview, setMyInterview] = useState('');
 

  // const Jobs = savedJobsList.map((con, key) => {
  //   return <Job {...con} key={key} />;
  // });

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
    a.href = myInterview;
    a.download = 'interview_video.mp4';
    a.click();
  };

  async function MyInterview() {
    const r = await fetch('http://127.0.0.1:3001/get-video', {
      method: 'POST',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
    const d = await r.json();
    console.log(d)
    setMyInterview('https://drive.google.com/uc?export=download&id='+d);
    console.log('https://drive.google.com/uc?export=download&id=' + d)
  }

  useEffect(() => {
    MyInterview();
  }, []);
  return (
    <div>
        <div className="my-interview">
        <div>
        <video ref={videoRef} className="video-js vjs-default-skin" width="640" height="480" src={myInterview} type="video/mp4" />
        </div>
        <div>
        <button className='btn btn-primary button' onClick={handleDownload}>
            Download Video
          </button>
          </div>
        </div>
     
    </div>
  );
}

export default MyInterview;
