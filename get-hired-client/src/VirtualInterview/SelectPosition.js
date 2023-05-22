import {  useState } from "react";
import VideoInterviewer from './VideoInterviewer';
import {  useNavigate } from "react-router-dom";


function SelectPosition() {

  const options = [
    "Front-end developer","Full stack developer","Embedded software"
  ];

  const [selectedPosition, setSelectedPosition]= useState("");

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/TrialRecording', {
      state: {
        selectedPosition: selectedPosition
      }
    });
  };

  return (
    <div>
    <h3>Your next step is to choose your target position.
    Here's a list.
    Pick the one that aligns with your career goals.
    This will customize your interview questions. Take your time,
    make your choice.</h3>
    <VideoInterviewer width="235" height="420" src="https://drive.google.com/uc?export=download&id=18KSPR8SgME4EOc0KXdyzxre4Yc3q_vHs"  />
    {options.map((option) => (
      <div key={option}>
        <label>
          <input
            type="radio"
            value={option}
            checked={selectedPosition === option}
            onChange={handlePositionChange}
          />
          {option}
        </label>
      </div>
    ))}
    <br />
    <button className="select-position-next-button" onClick={handleClick} disabled={!selectedPosition}>Next</button>
    </div>
  );
}

export default SelectPosition;
