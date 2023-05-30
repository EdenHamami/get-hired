import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import "./Timer.css"

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Button variant="outline-light" className="timer-btn">
      Timer: {formatTime(seconds)}
    </Button>
  );
}

export default Timer;
