import React, { useRef, useState } from 'react';

function ScreenRecorder() {
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleStartRecording = async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Combine the video track from the screenStream with the audio track from the micStream
    let tracks = [...screenStream.getVideoTracks(), ...micStream.getAudioTracks()];
    let stream = new MediaStream(tracks);

    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.start();

    setRecording(true);
  };

  const handleDataAvailable = (e) => {
    if (e.data.size > 0) {
      setRecordedChunks((prev) => prev.concat(e.data));
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleDownload = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'test.webm';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  };

  return (
    <div>
      <button onClick={handleStartRecording} disabled={recording}>
        Start recording
      </button>
      <button onClick={handleStopRecording} disabled={!recording}>
        Stop recording
      </button>
      <button onClick={handleDownload} disabled={recording || !recordedChunks.length}>
        Download
      </button>
    </div>
  );
}

export default ScreenRecorder;
