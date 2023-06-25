import React, { useState, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext'
import { BsFillGridFill, BsFonts, BsImages, BsDownload } from 'react-icons/bs';
import design1 from '../../images/design1.jpg';
import design2 from '../../images/design2.jpg';
import design3 from '../../images/design3.jpg';
import './DesignNavbar.css';
import html2pdf from 'html2pdf.js';
;

function DesignNavbar() {
//We define the functional component 'DesignNavbar' 
//and use the useContext Hook to extract the current design options and template ID from the global state.
  const { designOptions, setDesignOptions } = useContext(ResumeContext);
  const { templateId, setTemplateId } = useContext(ResumeContext);

/*
These state variables are used to control the visibility of different interactive elements in the design toolbar. 
The useState Hook initializes these to false, meaning these elements are hidden by default.
*/
  const [isTemplatesVisible, setIsTemplatesVisible] = useState(false);
  const [isFontVisible, setIsFontVisible] = useState(false);
  const [isColorVisible, setIsColorVisible] = useState(false);
  const [isFontColorVisible, setIsFontColorVisible] = useState(false);
  // const [isFontSizeVisible, setIsFontSizeVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);



  /*
  
  We define various event handler functions to respond to user interactions.
   For example, 'handleBackgroundColorChange' updates the designOptions object with the new background color selected by the user.
   This process repeats for other design features such as font and font color. */
  const handleBackgroundColorChange = (e) => {
    const newResumeStyle = { ...designOptions, backgroundColor: e.target.value };
    setDesignOptions(newResumeStyle);
  };

  const handleFontChange = (e) => {
    const newResumeStyle = { ...designOptions, fontFamily: e.target.value };
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

  // const toggleFontSizeVisibility = () => {
  //   setIsFontSizeVisible(!isFontSizeVisible);
  // };

  const toggleTemplatesVisibility = () => {
    setIsTemplatesVisible(!isTemplatesVisible);
  };
 
  
  const handleDownload = () => {
    const resumeElement = document.querySelector('.resume'); //Selection of the Resume Element
    const clone = resumeElement.cloneNode(true);    //Cloning the Resume Element-deep clone, including all the child nodes
    clone.style.transform = ''; //ensure that it retains its original dimensions during the conversion process.
//Options for PDF Conversion:
    const opt = {
      margin: [0, 0, 0, 0],
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(clone).save();//Conversion to PDF
  };


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
           Font Family
        </button>
        {isFontVisible && (
          <select name="font" value={designOptions.fontFamily} onChange={handleFontChange} className="designNavbar-option">
  <option value="'Nunito', sans-serif" style={{ fontFamily: 'Nunito, sans-serif' }}>Nunito</option>
  <option value="'Calibri', sans-serif" style={{ fontFamily: 'Calibri, sans-serif' }}>Calibri</option>
  <option value="'Roboto', sans-serif" style={{ fontFamily: 'Roboto, sans-serif' }}>Roboto</option>
  <option value="'Montserrat', sans-serif" style={{ fontFamily: 'Montserrat, sans-serif' }}>Montserrat</option>
  <option value="'Lato', sans-serif" style={{ fontFamily: 'Lato, sans-serif' }}>Lato</option>
  <option value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>

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
{/* 
      <div className="designNavbar-item">
        <button onClick={toggleFontSizeVisibility}>
          <BsFonts />
        Font Size
        </button>
        {isFontSizeVisible && (
          <input type="number" value={designOptions.fontSize} onChange={handleFontSizeChange} min="1" max="100" className="designNavbar-option"/>
        )}
      </div> */}

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