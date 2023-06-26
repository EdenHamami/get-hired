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
import MyExercises from './TechnicalQuestions/MyExercises';
import SelectDifficulty from './TechnicalQuestions/SelectDifficulty';
import TrialRecording from './VirtualInterview/TrialRecording';
import VirtualInterview from './VirtualInterview/VirtualInterview';
import Page5 from './VirtualInterview/Page5';
import LastPage from './VirtualInterview/LastPage';
import HelloJohn from './VirtualInterview/HelloJohn';
import ExplanationInterview from './VirtualInterview/ExplanationInterview';
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
import StartingPage from './components/StartingPage';
import LoginPage from './LoginPage';
import SavedJobs from './jobs/SavedJobs';
import MyInterview from './VirtualInterview/MyInterview';
import MyCv from './Pages/ResumeCreationPage/MyCv'
import AboutUs from './AboutUs';
import UserContext, { UserProvider } from './context/UserContext';
import technicalQuestionsIntro from './TechnicalQuestions/technicalQuestionsIntro';
import PortfolioProposals from './PortfolioProposals/PortfolioProposals'
import CareerPlanner from "./CareerPlanner/CareerPlanner"
import ResumePortfolio from "./ResumePortfolio"
import TechnicalPersonal from "./TechnicalPersonal"
import CareerPlannerResult from "./CareerPlanner/CareerPlannerResult"
import PortfolioProposalsResult from "./PortfolioProposals/PortfolioProposalsResult"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    
    <UserProvider>
    <ResumeProvider>
    <Navbar></Navbar>
      <Routes>
        <Route path="/OpeningPage" element={<OpeningPage />} />
        <Route path="/MyCv" element={<MyCv />} />
        <Route path="/DesignSelectionPage" element={<DesignSelectionPage />} />
        <Route path="/ResumeCreationPage" element={<ResumeCreationPage />} />
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
        <Route path="/LastPage" element={<LastPage />} />
        <Route path="/HelloJohn" element={<HelloJohn />} />
        <Route path="/TrialRecording" element={<TrialRecording />} />
        <Route path="/Page5" element={<Page5 />} />
        <Route path="/ExplanationInterview" element={<ExplanationInterview />} />
        <Route path="/JobsSearch" element={<JobsSearch />} />
        <Route path="/JobsSearchResult" element={<JobsSearchResult />} />
        <Route path="/Tips" element={<TipsList />} />
        <Route path="/" element={<StartingPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/SavedJobs" element={<SavedJobs />} />
        <Route path="/MyInterview" element={<MyInterview />} />
        <Route path="/MyExercises" element={<MyExercises />} />
        <Route path="/PortfolioProposals" element={<PortfolioProposals />} />
        <Route path="/CareerPlanner" element={<CareerPlanner />} />
        <Route path="/ResumePortfolio" element={<ResumePortfolio />} />
        <Route path="/TechnicalPersonal" element={<TechnicalPersonal />} />
        <Route path="/PortfolioProposalsResult" element={<PortfolioProposalsResult />} />
        <Route path="/career-planner-result" element={<CareerPlannerResult />} />

      </Routes>
    </ResumeProvider>
    </UserProvider>
  </BrowserRouter>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();