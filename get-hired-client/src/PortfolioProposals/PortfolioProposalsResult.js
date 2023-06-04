import React from 'react';
import { useLocation } from "react-router-dom";
import './PortfolioProposalsResult.css';

function PortfolioProposalsResult() {
    const location = useLocation();
    const message = location.state.message;

    return (
        <div className="PortfolioProposalsResult-container">
        <div className="PortfolioProposalsResult-container-image"></div>
        <div className="PortfolioProposalsResult-container-content">

            
        <p>{message}</p>
        </div>

        </div>
    );
}

export default PortfolioProposalsResult;
