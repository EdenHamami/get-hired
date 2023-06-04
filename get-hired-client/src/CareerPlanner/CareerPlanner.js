import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from 'react-icons/fa';
import './CareerPlanner.css';

function CareerPlanner() {
    const navigate = useNavigate();
    const [studyField, setStudyField] = useState('Computer Science');
    const [currentRole, setCurrentRole] = useState('Software Developer');
    const [experience, setExperience] = useState('5');
    const [careerGoals, setCareerGoals] = useState('Project Manager in 5 years, CTO in 10 years');
    const [aspiredPositions, setAspiredPositions] = useState('Project Manager, CTO');
    const [strengths, setStrengths] = useState('Problem-solving, Teamwork, Java programming');
    const [interests, setInterests] = useState('AI and Machine Learning, Project Management');
    const [careerVision, setCareerVision] = useState('Leading tech projects and later tech strategy in a leading tech company');
    const [desiredIndustries, setDesiredIndustries] = useState('Tech, AI, E-commerce');
    const [skillGaps, setSkillGaps] = useState('Project management, Leadership');
    const [careerChangeOpenness, setCareerChangeOpenness] = useState({ checked: true });
    const [workLifeImportance, setWorkLifeImportance] = useState('Very important');
    const [furtherEducation, setFurtherEducation] = useState({ checked: true });
    const [geographicalPreferences, setGeographicalPreferences] = useState('Open to relocation, prefer big tech cities');
    const [challengeHandling, setChallengeHandling] = useState('By being proactive and seeking help when needed');
    const [leadershipRole, setLeadershipRole] = useState({ checked: true });

    const handleCheckboxClick = (setFunction, state) => {
        setFunction({ checked: !state.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let message = `The user's field of study is ${studyField} and their current role is ${currentRole}. They have ${experience} years of experience. Their short-term and long-term career goals are ${careerGoals}. They aspire to reach the positions of ${aspiredPositions} in their career. Their key strengths and skills are ${strengths}. They have an interest in ${interests}. Their career vision for the next 5-10 years is ${careerVision}. They desire to work in the industries or companies of ${desiredIndustries}. They believe they need to bridge the following skill gaps: ${skillGaps}. They are ${careerChangeOpenness.checked ? 'open' : 'not open'} to exploring different career paths or making a career change. Work-life balance is ${workLifeImportance} important to them. They are ${furtherEducation.checked ? 'open' : 'not open'} to pursuing additional education, certifications, or training. Their geographical preferences or limitations are ${geographicalPreferences}. They handle challenges or setbacks in the following way: ${challengeHandling}. They are ${leadershipRole.checked ? 'comfortable' : 'not comfortable'} with taking on leadership or managerial roles. Give this user recommended career planning,
        Keep the following structure:
        1.-Introduction- Your answer should include a maximum of 100 letters
        2. Goals for the near term - your answer will include a maximum of 400 letters -
        3. Long-term goals - your answer will include a maximum of 400 letters
        4. Summary - Your answer should contain a maximum of 100 letters`;
        navigate('/career-planner-result', { state: { message: message } });
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
                    What is your current job role or industry?
                    <input type="text" value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} required />
                </label>
                <label>
                    How many years of work experience do you have?
                    <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} required />
                </label>
                <label>
                    What are your short-term and long-term career goals?
                    <input type="text" value={careerGoals} onChange={(e) => setCareerGoals(e.target.value)} required />
                </label>
                <label>
                    Are there any specific roles or positions you aspire to reach in your career?
                    <input type="text" value={aspiredPositions} onChange={(e) => setAspiredPositions(e.target.value)} required />
                </label>
                <label>
                    What are your key strengths and skills that can contribute to your career progression?
                    <input type="text" value={strengths} onChange={(e) => setStrengths(e.target.value)} required />
                </label>
                <label>
                    What are your areas of interest or passion within your field?
                    <input type="text" value={interests} onChange={(e) => setInterests(e.target.value)} required />
                </label>
                <label>
                    How do you envision your career progressing over the next 5-10 years?
                    <input type="text" value={careerVision} onChange={(e) => setCareerVision(e.target.value)} required />
                </label>
                <label>
                    Are there any particular industries or companies you would like to work for in the future?
                    <input type="text" value={desiredIndustries} onChange={(e) => setDesiredIndustries(e.target.value)} required />
                </label>
                <label>
                    Have you identified any potential gaps in your skills or knowledge that you need to bridge for your career growth?
                    <input type="text" value={skillGaps} onChange={(e) => setSkillGaps(e.target.value)} required />
                </label>
                <label>
                    Are you open to exploring different career paths or making a career change in the future?
                    <div className={`custom-checkbox ${careerChangeOpenness.checked ? 'checked' : ''}`} onClick={() => handleCheckboxClick(setCareerChangeOpenness, careerChangeOpenness)}>
                        <FaCheckCircle className="checkbox-icon" />
                    </div>
                </label>
                <label>
                    How important is work-life balance to you?
                    <input type="text" value={workLifeImportance} onChange={(e) => setWorkLifeImportance(e.target.value)} required />
                </label>
                <label>
                    Are you interested in pursuing additional education, certifications, or training to enhance your skills and advance your career?
                    <div className={`custom-checkbox ${furtherEducation.checked ? 'checked' : ''}`} onClick={() => handleCheckboxClick(setFurtherEducation, furtherEducation)}>
                        <FaCheckCircle className="checkbox-icon" />
                    </div>
                </label>
                <label>
                    Do you have any geographical preferences or limitations for your career progression?
                    <input type="text" value={geographicalPreferences} onChange={(e) => setGeographicalPreferences(e.target.value)} required />
                </label>
                <label>
                    How do you handle challenges or setbacks in your professional life?
                    <input type="text" value={challengeHandling} onChange={(e) => setChallengeHandling(e.target.value)} required />
                </label>
                <label>
                    Are you comfortable with taking on leadership or managerial roles in your career?
                    <div className={`custom-checkbox ${leadershipRole.checked ? 'checked' : ''}`} onClick={() => handleCheckboxClick(setLeadershipRole, leadershipRole)}>
                        <FaCheckCircle className="checkbox-icon" />
                    </div>
                </label>

                <button type="submit" className="career-planner-next-button">Submit</button>
            </form>
        </div>
    );
}

export default CareerPlanner;
