import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const ResumeContext = createContext();

const ResumeProvider = ({ children }) => {

  const [templateId, setTemplateId] = useState(1);
  
  const designOptions1 = {
    backgroundColor: '#ffc001',
    fontColor: '#000',
    fontFamily: "font-family: 'Nunito', sans-serif",
   
    fontSize: 1,
  };

  const designOptions2 = {
    backgroundColor: '#718ea8',
    fontColor: '#000',
    fontFamily: "Calibri, sans-serif",
    fontSize: 1
  };

  const designOptions3 = {
    backgroundColor: '#d9bcac',
    fontColor: '#351e45',
    fontFamily: "calibri",
    fontSize: 1,
    backgroundColor2: '#f7f4f5',

  };
  const [designOptions, setDesignOptions] = useState(designOptions1);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
      street: '',
      city: '',
      state: '',
    
    image: '',
    desiredJob: '' // Add desired job field
  });

  const [workExperience, setWorkExperience] = useState([]);

  const [education, setEducation] = useState([]);

  const [skills, setSkills] = useState([]);

  const [summary, setSummary] = useState('');
  const loadData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/loadCvData', {
        headers: { Authorization: localStorage.getItem('token') }
      });
     
      if (response.data.personalInfo && response.data.personalInfo.length !== 0) {
        console.log(response.data.personalInfo);
        setPersonalInfo(response.data.personalInfo);
      }
      if (response.data.workExperience && response.data.workExperience.length !== 0) {
        setWorkExperience(response.data.workExperience);
      }
      if (response.data.education && response.data.education.length !== 0) {
        setEducation(response.data.education);
      }
      if (response.data.skills && response.data.skills.length !== 0) {
        setSkills(response.data.skills);
      }
      if (response.data.summary) {
        setSummary(response.data.summary);
      }
      // if (response.data.designOptions1) {
      //   setDesignOptions1(response.data.designOptions1);
      // }
      // if (response.data.designOptions2) {
      //   setDesignOptions2(response.data.designOptions2);
      // }
      // if (response.data.designOptions3) {
      //   setDesignOptions3(response.data.designOptions3);
      // }
    } catch (error) {
      console.error('Failed to load data', error);
    }
    console.log(personalInfo)
  };

  const saveData = async () => {
    try {
      await axios.post('http://127.0.0.1:3001/saveCvData', {
        personalInfo: personalInfo,
       
        workExperience: workExperience,
        education: education,
        skills: skills,
        summary: summary,
        // designOptions1: designOptions1,
        // designOptions2: designOptions2,
        // designOptions3: designOptions3
    }
        , {headers: { Authorization: localStorage.getItem('token') }
      });
    } catch (error) {
      console.error('Failed to save data', error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        templateId,
        setTemplateId,
        designOptions,

        designOptions1,
        designOptions2,
        
        designOptions3,
        setDesignOptions,
        
        personalInfo,
        setPersonalInfo,
        workExperience,
        setWorkExperience,
        education,
        setEducation,
        skills,
        setSkills,
        summary,
        setSummary,
        saveData
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export { ResumeProvider };
// const [personalInfo, setPersonalInfo] = useState({
//   firstName: '',
//   lastName: '',
//   email: '',
//   phone: '',
//   address: {
//     street: '',
//     city: '',
//     state: '',
//   },
//   image: '',
//   desiredJob: '' // Add desired job field
// });

// const [workExperience, setWorkExperience] = useState([{
//   title: '',
//   company: '',
//   startDate: '',
//   endDate: '',
//   description: '',
// }]);

// const [education, setEducation] = useState([{
//   institution: '',
//   degree: '',
//   grade: '',
//   startDate: '',
//   endDate: '',
//   description: '',
// }]);

// const [skills, setSkills] = useState([]);

// const [summary, setSummary] = useState('');

// return (
//   <ResumeContext.Provider
//     value={{
//       templateId,
//       setTemplateId,
//       designOptions,
//       designOptions1,
//       designOptions2,
//       designOptions3,
//       setDesignOptions,
//       personalInfo,
//       setPersonalInfo,
//       workExperience,
//       setWorkExperience,
//       education,
//       setEducation,
//       skills,
//       setSkills,
//       summary,
//       setSummary,
//     }}
//   >
//     {children}
//   </ResumeContext.Provider>
// );
// };

// export { ResumeProvider };