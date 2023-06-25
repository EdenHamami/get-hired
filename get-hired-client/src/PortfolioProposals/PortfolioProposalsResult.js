
import { useLocation } from "react-router-dom";
import './PortfolioProposalsResult.css';
import React, { useState, useEffect } from 'react';

function PortfolioProposalsResult() {

    const location = useLocation();
    const message = location.state.message;
    const [answer, setAnswer] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    
    async function fetchData() {
        //console.log('PortfolioProposalsResult')
        setIsLoading(true); // Set loading state to true
        const r = await fetch('http://127.0.0.1:3001/askGpt', {
            
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: message}),
          });
        const d = await r.json();
        console.log(d.message.content)
        setAnswer(d.message.content);
        console.log(answer)
       setIsLoading(false); // Set loading state to false when done
    };
    useEffect(() => {
        fetchData();
      }, []);
      const lines = answer.split('\n').map((line, i) => <p key={i}>{line}</p>);
   
   
   
   
      return (
        <div className="PortfolioProposalsResult-container">
        {isLoading && (
            <div className="loading-container">
              <img src="./loading.gif" alt="Loading..." className="loading-gif" />
            </div>
          )}
        <div className="PortfolioProposalsResult-container-image"></div>
        <div className="PortfolioProposalsResult-container-content">
        <h1 className="title">We found the perfect project for you!</h1>

            
        {lines}
        </div>

        </div>
    );
}

export default PortfolioProposalsResult;