import React from 'react';
import { useLocation } from "react-router-dom";
import './CareerPlannerResult.css';

function CareerPlannerResult() {
    const location = useLocation();
    const message = location.state.message;

    return (
        <div className="career-planner-result-container">
        <div className="career-planner-result-container-image"></div>
        <div className="career-planner-result-content">

            
        <p>{message}</p>
        </div>

        </div>
    );
}

export default CareerPlannerResult;
