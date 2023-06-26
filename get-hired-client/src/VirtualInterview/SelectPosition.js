import { useState } from "react";
import VideoInterviewer from './VideoInterviewer';
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./SelectPosition.css"

function SelectPosition() {

  const options = [
    { id: 1, name: "Front-end developer", checked: false },
    { id: 2, name: "Full stack developer", checked: false },
    { id: 3, name: "Embedded software", checked: false },
  ];

  const [positions, setPositions]= useState(options);

  const handlePositionClick = (positionId) => {
    const updatedPositions = positions.map((position) =>
      position.id === positionId ? { ...position, checked: !position.checked } : { ...position, checked: false }
    );
    setPositions(updatedPositions);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    const selectedPosition = positions.find(position => position.checked);
    navigate('/TrialRecording', {
      state: {
        selectedPosition: selectedPosition.name
      }
    });
  };

  return (
    <div className="main-container">
          <div className="video-container">
    <VideoInterviewer width="235" height="420" src={require('./videos-interviewer/page3.mp4')}  />
    </div>
    <div className="text-container">
    <h3> <b>Your next step is to choose your target position,</b></h3>
    <h4><b>Here's a list-</b></h4>
    <div>Pick the one that aligns with your career goals, <br/>This will customize your interview questions</div>
     <b>Take your time,make your choice.</b>


     <div className="select-position-container">

    {positions.map((option) => (
          <div key={option.id} className={`select-position-item ${option.checked ? 'checked' : ''}`} onClick={() => handlePositionClick(option.id)}>
            <FaCheckCircle className="checkbox-icon" />
            {option.name}
          </div>
        ))}
        </div>
    <button className="select-position-next-button" onClick={handleClick} disabled={!positions.some(option => option.checked)}>Next</button>
    </div>
    </div>
  );
}

export default SelectPosition;
