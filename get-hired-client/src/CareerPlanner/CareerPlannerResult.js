import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './CareerPlannerResult.css';

function CareerPlannerResult() {
    const location = useLocation();
    const message = location.state.message;
    const [answer, setAnswer] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true); 
        const r = await fetch('http://127.0.0.1:3001/askGpt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ question: message}),
          });

        const d = await r.json();
        setAnswer(d.message.content);
        setIsLoading(false); 
    };

    useEffect(() => { fetchData(); }, []);

    const lines = answer.split('\n').map((line, i) => <p key={i}>{line}</p>);

  
  
    return (
        <div className="career-planner-result-container">
        {isLoading && (
            <div className="loading-container">
              <img src="./loading.gif" alt="Loading..." className="loading-gif" />
            </div>
          )}

        <div className="career-planner-result-container-image"></div>
        <div className="career-planner-result-content">
          <h1 className="title">Your career plan</h1>
          {lines}
        </div>
        </div>
    );
}

export default CareerPlannerResult;