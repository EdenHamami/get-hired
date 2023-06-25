import React, { useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { ResumeContext } from "../../context/ResumeContext";
import Template1 from "../../templates/Template1";
import Template2 from  "../../templates/Template2";
import Template3 from  "../../templates/Template3";
import html2pdf from 'html2pdf.js';
import "../../styles/RightSide.css";
import Button from '../../components/Button';
import DesignNavbar from './DesignNavbar'; 
import { AccordionSummary } from '@material-ui/core';
const MyCv = () => {
  
  const {
    templateId,
    designOptions,
    personalInfo,
    workExperience,
    education,
    skills,
    summary,
    designOptions1,
    designOptions2,
    designOptions3,
    setDesignOptions ,
    saveData
  } = useContext(ResumeContext);
  useEffect(() => {
    switch (templateId) {
      case 1:
        setDesignOptions(designOptions1)
        break;
      case 2:
        setDesignOptions(designOptions2)

        break;
      case 3:
        setDesignOptions(designOptions3)
        break;
      default:
        setDesignOptions({
          backgroundColor: '#ffffff',
          fontColor: '#000000',
          fontFamily: 'Arial',
          fontSize: '12',
          template: 1,
        });
        break;
    }
  }, [templateId, setDesignOptions]);
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

    html2pdf().set(opt).from(clone).save();
  };
  const edit = () => {
  
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 1:
        
        return <Template1 {...{ personalInfo, workExperience, education, skills, summary, designOptions }} />;
      case 2:
        return <Template2 {...{ personalInfo, workExperience, education, skills, summary, designOptions }} />;
      case 3:
        return <Template3 {...{ personalInfo, workExperience, education, skills, summary, designOptions }} />;
      default:
        return <div>Please select a template</div>;
    }
  };
 

  return (
    <div className="right-side">
      <div className="resume-preview">
        <div className="resume">{renderTemplate()}</div>
      </div>
   
       <button className="btn btn-primary" onClick={handleDownload}>
        Download as PDF
      </button> 
      <Link to="/DesignSelectionPage">
      <button className="btn btn-primary">Edit your Resume</button>
      </Link>
    </div>
  );
};

export default MyCv;
