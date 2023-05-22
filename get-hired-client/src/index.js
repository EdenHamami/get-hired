
import JobsSearchResult from './jobs/JobsSearchResult';
import JobsSearch from './jobs/JobsSearch';
import React from 'react';
import ReactDOM from 'react-dom';
import ResumeContext, { ResumeProvider } from './context/ResumeContext';
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import './index.css';
import Questions from './TechnicalQuestions/TechnicalQuestions';
import OnlineCompiler from './TechnicalQuestions/OnlineCompiler';
import SelectTopics from './TechnicalQuestions/SelectTopics';
import SelectDifficulty from './TechnicalQuestions/SelectDifficulty';
import TrialRecording from './VirtualInterview/TrialRecording';
import VirtualInterview from './VirtualInterview/VirtualInterview';
import SelectPosition from './VirtualInterview/SelectPosition';
import Menu from './Menu';
import Opening from './PersonalQuestions/Opening';
import PersonalTable from './PersonalQuestions/PersonalTable';
import PersonalQuestion from './PersonalQuestions/PersonalQuestion';
import reportWebVitals from './reportWebVitals';
import RegistrationPage from './RegistrationPage';
import OpeningPage from './Pages/OpeningPage';
import DesignSelectionPage from './Pages/DesignSelectionPage';
import ResumeCreationPage from './Pages/ResumeCreationPage/ResumeCreationPage';
import TipsList from './Tips/TipsList';
import Navbar from './components/Navbar';
import MyComponent from './components/MyComponent ';
import StartingPage from './components/StartingPage';
import LoginPage from './LoginPage';
import AboutUs from './AboutUs';
import technicalQuestionsIntro from './TechnicalQuestions/technicalQuestionsIntro';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Navbar></Navbar>
  <ResumeProvider>
      <Routes>
      <Route path="/OpeningPage" element={<OpeningPage />} />
      <Route path="/DesignSelectionPage" element={<DesignSelectionPage />} />
      <Route path="/ResumeCreationPage" element={<ResumeCreationPage/>} />
        <Route path="/technical_questions" element={<Questions />} />
        <Route path="/select_difficulty" element={<SelectDifficulty />} />
        <Route path="/RegistrationPage" element={<RegistrationPage />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/select_topics" element={<SelectTopics />} />
        <Route path="/opening_personal_questions" element={<Opening />} />
        <Route path="/online_compiler" element={<OnlineCompiler />} />
        <Route path="/personal_table" element={<PersonalTable />} />
        <Route path="/personal_question" element={<PersonalQuestion />} />
        <Route path="/VirtualInterview" element={<VirtualInterview />} />
        <Route path="/SelectPosition" element={<SelectPosition />} />
        <Route path="/TrialRecording" element={<TrialRecording />} />
        <Route path="/JobsSearch" element={<JobsSearch />} />
        <Route path="/JobsSearchResult" element={<JobsSearchResult />} />
        <Route path="/Tips" element={<TipsList />} />
        <Route path="/" element={<StartingPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/about" element={<AboutUs />} />



      </Routes>
      </ResumeProvider>
    </BrowserRouter>

  
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();