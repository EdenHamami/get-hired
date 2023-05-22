import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './TipsList.css';
import tips from './tipsData';
import Navbar from '../components/Navbar';
import TipTab from './TipTab'; // Add this import
import titleImage from './tips-title.png'; // Add this import for the title image

const TipsList = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goLeft = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goRight = () => {
    if (activeIndex < tips.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const startIndex = Math.min(Math.max(0, activeIndex - 1), tips.length - 4);
  const displayedTips = tips.slice(startIndex, startIndex + 4);

  return (
   
      <div className="tablist-wrapper">
        <img src={titleImage} alt="Title" className="title-image" /> {/* Use img element to display the title image */}
        <div className="tab-container">
        <button className={`arrow-button ${activeIndex === 0 ? 'disabled' : ''}`} onClick={goLeft}>
  &#8592;
</button>
          {displayedTips.map((tip, index) => (
            <TipTab
              key={index}
              tip={tip}
              active={index + startIndex === activeIndex}
              onClick={() => setActiveIndex(index + startIndex)}
              index={index + startIndex}
            />
          ))}
    <button className={`arrow-button ${activeIndex === tips.length - 1 ? 'disabled' : ''}`} onClick={goRight}>
  &#8594;
</button>
        </div>
      </div>
  );
};

export default TipsList;
