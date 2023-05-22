import React, { useState, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext'
import { BsFillGridFill, BsFonts, BsImages, BsDownload } from 'react-icons/bs';
import design1 from '../../images/design1.jpg';
import design2 from '../../images/design2.jpg';
import design3 from '../../images/design3.jpg';
import './DesignNavbar.css';

function DesignNavbar() {
  const { designOptions, setDesignOptions } = useContext(ResumeContext);
  const { templateId, setTemplateId } = useContext(ResumeContext);

  const [isTemplatesVisible, setIsTemplatesVisible] = useState(false);
  const [isFontVisible, setIsFontVisible] = useState(false);
  const [isColorVisible, setIsColorVisible] = useState(false);
  const [isFontColorVisible, setIsFontColorVisible] = useState(false);

  const handleBackgroundColorChange = (e) => {
    const newResumeStyle = { ...designOptions, backgroundColor: e.target.value };
    setDesignOptions(newResumeStyle);
  };

  const handleFontChange = (e) => {
    const newResumeStyle = { ...designOptions, font: e.target.value };
    setDesignOptions(newResumeStyle);
  };

  const handleFontColorChange = (e) => {
    const newResumeStyle = { ...designOptions, fontColor: e.target.value };
    setDesignOptions(newResumeStyle);
  };

  const handleTemplateChange = (e) => {
    setTemplateId(parseInt(e.target.value));
  };

  const handleTemplateClick = (id) => {
    setTemplateId(id);
    setIsTemplatesVisible(false);
  };

  const toggleColorVisibility = () => {
    setIsColorVisible(!isColorVisible);
  };

  const toggleFontVisibility = () => {
    setIsFontVisible(!isFontVisible);
  };

  const toggleFontColorVisibility = () => {
    setIsFontColorVisible(!isFontColorVisible);
  };

  const toggleTemplatesVisibility = () => {
    setIsTemplatesVisible(!isTemplatesVisible);
  };

  const handleDownload = () => {
    // download function here
  };

  return (
    <div className="designNavbar">
      <div className="designNavbar-item">
        <button onClick={toggleColorVisibility}>
          <BsFillGridFill />
          Change Background
        </button>
        {isColorVisible && (
          <input type="color" value={designOptions.backgroundColor} onChange={handleBackgroundColorChange} />
        )}
      </div>

      <div className="designNavbar-item">
        <button onClick={toggleFontVisibility}>
          <BsFonts />
          Change Font
        </button>
        {isFontVisible && (
          <select name="font" value={designOptions.font} onChange={handleFontChange}>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        )}
      </div>

      <div className="designNavbar-item">
        <button onClick={toggleFontColorVisibility}>
          <BsFonts />
          Change Font Color
        </button>
        {isFontColorVisible && (
          <input type="color" value={designOptions.fontColor} onChange={handleFontColorChange} />
        )}
      </div>

      <div className="designNavbar-item">
        <button onClick={toggleTemplatesVisibility}>
          <BsImages />
          Change Template
        </button>
        {isTemplatesVisible && (
          <div className="designNavbar-templates">
            <label>
              <input type="radio" name="templateId" value="1" style={{ display: 'none' }} checked={templateId === 1} onChange={handleTemplateChange} />
              <img src={design1} alt="Design 1" onClick={() => handleTemplateClick(1)} className={templateId === 1 ? 'selected' : ''} />
            </label>
            <label>
              <input type="radio" name="templateId" value="2" style={{ display: 'none' }} checked={templateId === 2} onChange={handleTemplateChange} />
              <img src={design2} alt="Design 2" onClick={() => handleTemplateClick(2)} className={templateId === 2 ? 'selected' : ''} />
            </label>
            <label>
              <input type="radio" name="templateId" value="3" style={{ display: 'none' }} checked={templateId === 3} onChange={handleTemplateChange} />
              <img src={design3} alt="Design 3" onClick={() => handleTemplateClick(3)} className={templateId === 3 ? 'selected' : ''} />
            </label>
          </div>
        )}
      </div>

      <div className="designNavbar-item">
        <button onClick={handleDownload}>
          <BsDownload />
          Download
        </button>
      </div>
    </div>
  );
}

export default DesignNavbar;
