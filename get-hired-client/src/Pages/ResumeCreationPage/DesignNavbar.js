import React, { useState, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext'
import { BsFillGridFill, BsFonts, BsImages, BsDownload } from 'react-icons/bs';
import design1 from '../../images/design1.jpg';
import design2 from '../../images/design2.jpg';
import design3 from '../../images/design3.jpg';
import './DesignNavbar.css';
import html2pdf from 'html2pdf.js';


function DesignNavbar() {
  const { designOptions, setDesignOptions } = useContext(ResumeContext);
  const { templateId, setTemplateId } = useContext(ResumeContext);

  const [isTemplatesVisible, setIsTemplatesVisible] = useState(false);
  const [isFontVisible, setIsFontVisible] = useState(false);
  const [isColorVisible, setIsColorVisible] = useState(false);
  const [isFontColorVisible, setIsFontColorVisible] = useState(false);
  const [isFontSizeVisible, setIsFontSizeVisible] = useState(false);

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

  const handleFontSizeChange = (e) => {
    const newResumeStyle = { ...designOptions, fontSize: e.target.value };
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

  const toggleFontSizeVisibility = () => {
    setIsFontSizeVisible(!isFontSizeVisible);
  };

  const toggleTemplatesVisibility = () => {
    setIsTemplatesVisible(!isTemplatesVisible);
  };

  const handleDownload = () => {
    const resumeElement = document.querySelector('.resume');
    const clone = resumeElement.cloneNode(true);
    clone.style.transform = '';

    const opt = {
      margin: [0, 0, 0, 0],
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(clone).save();  };

  return (
    <div className="designNavbar">
      <div className="designNavbar-item">
        <button onClick={toggleColorVisibility}>
          <BsFillGridFill />
           Background color
        </button>
        {isColorVisible && (
          <input type="color" value={designOptions.backgroundColor} onChange={handleBackgroundColorChange} className="designNavbar-option"/>
        )}
      </div>

      <div className="designNavbar-item">
        <button onClick={toggleFontVisibility}>
          <BsFonts />
           Font
        </button>
        {isFontVisible && (
          <select name="font" value={designOptions.font} onChange={handleFontChange} className="designNavbar-option">
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
           Font Color
        </button>
        {isFontColorVisible && (
          <input type="color" value={designOptions.fontColor} onChange={handleFontColorChange} className="designNavbar-option"/>
        )}
      </div>

      <div className="designNavbar-item">
        <button onClick={toggleFontSizeVisibility}>
          <BsFonts />
        Font Size
        </button>
        {isFontSizeVisible && (
          <input type="number" value={designOptions.fontSize} onChange={handleFontSizeChange} min="1" max="100" className="designNavbar-option"/>
        )}
      </div>

      <div className="designNavbar-item">
        <button onClick={toggleTemplatesVisibility}>
          <BsImages />
          Template
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
        <button className='Download-btn' onClick={handleDownload}>
          <BsDownload />
          Download as pdf
        </button>
      </div>
    </div>
  );
}

export default DesignNavbar;