import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './CareerPlanner.css';

function CareerPlanner() {
    const [studyField, setStudyField] = useState('');
    const [skills, setSkills] = useState('');
    const [careerGoal, setCareerGoal] = useState('');
    const [jobInterests, setJobInterests] = useState('');
    const [openToLearning, setOpenToLearning] = useState({ checked: false });
    const [workingConditions, setWorkingConditions] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [jobFactors, setJobFactors] = useState('');
    const [leadershipInterest, setLeadershipInterest] = useState({ checked: false });
    const [entrepreneurshipInterest, setEntrepreneurshipInterest] = useState({ checked: false });

    const handleCheckboxClick = (setFunction, state) => {
        setFunction({ checked: !state.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`The user has a background in ${studyField} and has gained skills in ${skills}. They are interested in ${careerGoal} and are looking at positions or companies in ${jobInterests}. They are ${openToLearning.checked ? 'open' : 'not open'} to learning new skills or gaining additional qualifications. They prefer to work ${workingConditions} and have a highest education level of ${educationLevel}. They value ${jobFactors} in a job. They are ${leadershipInterest.checked ? 'interested' : 'not interested'} in a leadership role in the future and have ${entrepreneurshipInterest.checked ? 'considered' : 'not considered'} entrepreneurship.`);
    };

    return (
        <div className="career-planner-container">
                        <div className="career-planner-container-image"></div>

            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    What is your field of study or training?
                    <input type="text" value={studyField} onChange={(e) => setStudyField(e.target.value)} required />
                </label>
                <label>
                    What skills have you gained from your education or previous jobs?
                    <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} required />
                </label>
                <label>
                    What is your dream job or career goal? If you're unsure, which fields or industries are you most interested in?
                    <input type="text" value={careerGoal} onChange={(e) => setCareerGoal(e.target.value)} required />
                </label>
                <label>
                    What types of positions or companies are you interested in for your first or next job?
                    <input type="text" value={jobInterests} onChange={(e) => setJobInterests(e.target.value)} required />
                </label>
                <label>
                    Are you open to learning new skills or gaining additional qualifications if necessary?
                    <select value={openToLearning} onChange={(e) => setOpenToLearning(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <label>
                    What are your preferred working conditions (remote, office, hybrid)?
                    <input type="text" value={workingConditions} onChange={(e) => setWorkingConditions(e.target.value)} required />
                </label>
                <label>
                    What is your highest level of education?
                    <input type="text" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} required />
                </label>
                <label>
                    What are the most important factors for you in a job (salary, work-life balance, company culture, etc.)?
                    <input type="text" value={jobFactors} onChange={(e) => setJobFactors(e.target.value)} required />
                </label>
                <label>
                    Are you interested in a leadership role in the future, even if it's a few years away?
                    <div className={`custom-checkbox ${leadershipInterest.checked ? 'checked' : ''}`} onClick={() => handleCheckboxClick(setLeadershipInterest, leadershipInterest)}>
                        <FaCheckCircle className="checkbox-icon" />
                    </div>
                </label>
                <label>
                    Have you considered entrepreneurship or starting your own business in the future?
                    <div className={`custom-checkbox ${entrepreneurshipInterest.checked ? 'checked' : ''}`} onClick={() => handleCheckboxClick(setEntrepreneurshipInterest, entrepreneurshipInterest)}>
                        <FaCheckCircle className="checkbox-icon" />
                    </div>
                </label>
                <button className="career-planner-next-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CareerPlanner;
