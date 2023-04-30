import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import './index.css';
import Questions from './TechnicalQuestions/TechnicalQuestions';
import OnlineCompiler from './TechnicalQuestions/OnlineCompiler';
import SelectTopics from './TechnicalQuestions/SelectTopics';
import SelectDifficulty from './TechnicalQuestions/SelectDifficulty';
import Menu from './Menu';
import Opening from './PersonalQuestions/Opening';
import PersonalTable from './PersonalQuestions/PersonalTable';
import PersonalQuestion from './PersonalQuestions/PersonalQuestion';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/technical_questions" element={<Questions />} />
        <Route path="/select_difficulty" element={<SelectDifficulty />} />
        <Route path="/" element={<Menu />} />
        <Route path="/select_topics" element={<SelectTopics />} />
        <Route path="/opening_personal_questions" element={<Opening />} />
        <Route path="/online_compiler" element={<OnlineCompiler />} />
        <Route path="/personal_table" element={<PersonalTable />} />
        <Route path="/personal_question" element={<PersonalQuestion />} />
        
      </Routes>
    </BrowserRouter>

  
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
