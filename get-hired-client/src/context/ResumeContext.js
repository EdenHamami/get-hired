import { createContext, useState } from 'react';

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
    firstName: 'Hila',
    lastName: 'Ninio',
    email: 'hilaninio2034@gmail.com',
    phone: '0545452034',
    address: {
      street: '123 Main St',
      city: 'Jerusalem',
      state: 'Israel',
    },
    image:  'hila.jpg',
    desiredJob: 'programmer' // Add desired job field
  });

  const [workExperience, setWorkExperience] = useState([
    {
      title: 'Private Tutor (English and Math)',
      company: '',
      startDate: '2021',
      endDate: 'Present',
      description: 'Worked on various projects.',
    },
    {
      title: 'Birthright instructor',
      company: '',
      startDate: '2020',
      endDate: '',
      description: 'Developed user interfaces for various Facebook products.',
    },
    {
      title: 'Special education teacher at Shalva',
      company: 'Shalva ',
      startDate: '2020',
      endDate: '2021',
      description: 'Worked on the Amazon website and related products.',
    },
  ]);

  const [education, setEducation] = useState([
    {
      institution: ' Bar Ilan University',
      degree: 'B.S. Computer Science',
      grade: '91.91',
      startDate: '2020',
      endDate: 'present',
      description: 'Notable courses: OOP, algorithms, advanced programing, computational complexity.',
    },  {
      institution: '',
      degree: 'Psychometry',
      grade: '752',
      startDate: '2017',
      endDate: '',
      description: '',
    }, {
      institution: 'High School Horev, Jerusalem',
      degree: '',
      grade: '114.2',
      startDate: '2010',
      endDate: '2016',
      description: '',
    }

  ]);

  const [skills, setSkills] = useState([
    'JavaScript',
    'React',
    'Node.js',
    'HTML',
    'CSS',
   "Python",
   "Hebrew-native",
   "English-fluent speaker",
"Java",
"C",
"C++"
  ]);

  const [summary, setSummary] = useState(
    'Curious about algorithms,math and software engineering Eager to learn and gain new skills,Technological sense,Creative thinker,Fast learner and hard worker,Great social skills'
  );

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