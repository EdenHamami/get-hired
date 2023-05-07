import {React, useState, useRef} from 'react';
//import VideoRecorder from 'react-video-recorder';

const App = () => {
  const [recordedVideo, setRecordedVideo] = useState(null);
  const videoRef = useRef();

  const handleRecordingComplete = (videoBlob) => {
    setRecordedVideo(videoBlob);
  };

  const handleDownloadVideo = () => {
    if (recordedVideo) {
      const url = URL.createObjectURL(recordedVideo);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'recorded-video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    // <div style={{textAlign:"center", marginTop:"10%",border:"1px solid grey", marginLeft:"30%",
    // marginRight:"30%",padding:"5%"}}>
    //   <div style={{position: 'relative'}}>
    //     <video
    //       ref={videoRef}
    //       style={{width: '100%'}}
    //       autoPlay
    //       muted
    //     />
    //     {recordedVideo ? null : (
    //       <VideoRecorder
    //         onRecordingComplete={handleRecordingComplete}
    //         isFlipped
    //         renderDisconnectedView={() => (
    //           <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
    //             <p style={{fontSize: '48px'}}></p>
    //           </div>
    //         )}
    //         renderUnsupportedView={() => (
    //           <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
    //             <p style={{fontSize: '48px'}}>Browser not supported</p>
    //           </div>
    //         )}
    //         videoStream={videoRef.current && videoRef.current.srcObject}
    //       />
    //     )}
    //   </div>
    //   {recordedVideo && (
    //     <button onClick={handleDownloadVideo} style={{marginTop: '10px'}}>
    //       Download Video
    //     </button>
    //   )}
    // </div>
    <div></div>
  );
};

export default App;
