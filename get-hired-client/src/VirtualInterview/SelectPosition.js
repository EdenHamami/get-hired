import {  useState } from "react";
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
    <h3>Choose the position</h3>
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
