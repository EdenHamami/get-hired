import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './PortfolioProposals.css';
import { useNavigate } from "react-router-dom";

function PortfolioProposals() {
    const navigate = useNavigate();
    const [field, setField] = useState('');
    const [proficiency, setProficiency] = useState([]);
    const [interests, setInterests] = useState('');
    const [purpose, setPurpose] = useState('');
    const [otherField, setOtherField] = useState(''); // state for the 'Other' input field


    const fields = ['Software Development', 'Data Science', 'Machine Learning', 'Web Development', 'Mobile App Development', 'Cybersecurity', 'Others'];
    const proficiencies = ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'Swift', 'Ruby', 'PHP', 'SQL', 'R', 'MATLAB', 'HTML/CSS', 'React.js', 'Node.js', 'Angular.js', 'Vue.js', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-Learn', 'Docker', 'AWS', 'Azure', 'GCP', 'Others'];
    const purposes = ['Job Applications', 'Freelance Work', 'Higher Studies Applications', 'Personal Interest', 'Others'];
    const handleCheckboxClick = (value) => {
        if (proficiency.includes(value)) {
            setProficiency(proficiency.filter(item => item !== value));
        } else {
            setProficiency([...proficiency, value]);
        }
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        let finalField = field === 'Other' ? otherField : field;
        let message=`The user is interested in the field of ${finalField} and is proficient in the following programming languages/tools: ${proficiency.join(', ')}. They've specified that they are particularly interested in ${interests}. The main purpose of their portfolio is ${purpose}. Could you please provide a light project idea that would be suitable for their portfolio?`;
        navigate('/PortfolioProposalsResult', { state: { message: message } });

    };

    return (
        <div className="portfolio-proposals-container">
       <div className="portfolio-proposals-container-image"></div>
       <form onSubmit={handleSubmit} className="form-container">
       <label>
            Which field are you interested in?
            <select value={field} onChange={(e) => setField(e.target.value)}>
                {fields.map((f, i) => <option key={i} value={f}>{f}</option>)}
            </select>
            {field === 'Other' && 
                <input type="text" placeholder="Please specify" value={otherField} onChange={(e) => setOtherField(e.target.value)} />}
        </label>

    <label>
       <div>What programming languages or tools are you proficient in? Select all that apply or add your own.</div> 
        {proficiencies.map((p, i) => (
            <div key={i} className={`custom-checkbox ${proficiency.includes(p) ? 'checked' : ''}`} onClick={() => handleCheckboxClick(p)}>
                <FaCheckCircle className="checkbox-icon" />
                <span>{p}</span>
            </div>
        ))}
    </label>

    <label>
        Do you have any specific interests or requirements for your projects? For example, do you want to use a certain API, work on a specific type of problem, or do you need the project to be suitable for beginners?
        <textarea value={interests} onChange={(e) => setInterests(e.target.value)} />
    </label>

    <label>
        What is the main purpose of your portfolio?
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            {purposes.map((p, i) => <option key={i} value={p}>{p}</option>)}
        </select>
    </label>

    <button className="portfolio-proposals-next-button" type="submit">Submit</button></form>
        </div>
    );
}

export default PortfolioProposals;

// return (
//     <div className="career-planner-container">
//                     <div className="career-planner-container-image"></div>

//         <form onSubmit={handleSubmit} className="form-container">
//             <label>
//                 What is your field of study or training?
//                 <input type="text" value={studyField} onChange={(e) => setStudyField(e.target.value)} required />
//             </label>
//             <label>
//                 What skills have you gained from your education or previous jobs?
//                 <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} required />
//             </label>
//             <label>
//                 What is your dream job or career goal? If you're unsure, which fields or industries are you most interested in?
//                 <input type="text" value={careerGoal} onChange={(e) => setCareerGoal(e.target.value)} required />
//             </label>
//             <label>
//                 What types of positions or companies are you interested in for your first or next job?
//                 <input type="text" value={jobInterests} onChange={(e) => setJobInterests(e.target.value)} required />
//             </label>
//             <label>
//                 Are you open to learning new skills or gaining additional qualifications if necessary?
//                 <select value={openToLearning} onChange={(e) => setOpenToLearning(e.target.value)}>
//                     <option value="">Select...</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select>
//             </label>
//             <label>
//                 What are your preferred working conditions (remote, office, hybrid)?
//                 <input type="text" value={workingConditions} onChange={(e) => setWorkingConditions(e.target.value)} required />
//             </label>
//             <label>
//                 What is your highest level of education?
//                 <input type="text" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} required />
//             </label>
//             <label>
//                 What are the most important factors for you in a job (salary, work-life balance, company culture, etc.)?
//                 <input type="text" value={jobFactors} onChange={(e) => setJobFactors(e.target.value)} required />
//             </label>
//             <label>
//                 Are you interested in a leadership role in the future, even if it's a few years away?
//                 <div className={`custom-checkbox ${leadershipInterest.checked ? 'checked' : ''}`} onClick={() => handleCheckboxClick(setLeadershipInterest, leadershipInterest)}>
//                     <FaCheckCircle className="checkbox-icon" />
//                 </div>
//             </label>
//             <label>
//                 Have you considered entrepreneurship or starting your own business in the future?
//                 <div className={`custom-checkbox ${entrepreneurshipInterest.checked ? 'checked' : ''}`} onClick={() => handleCheckboxClick(setEntrepreneurshipInterest, entrepreneurshipInterest)}>
//                     <FaCheckCircle className="checkbox-icon" />
//                 </div>
//             </label>
//             <button className="career-planner-next-button" type="submit">Submit</button>
//         </form>
//     </div>
// );

// <div className="portfolio-proposals-container">
// <form onSubmit={handleSubmit}>

//     <label>
//         Which field are you interested in?
//         <select value={field} onChange={(e) => setField(e.target.value)}>
//             {fields.map((f, i) => <option key={i} value={f}>{f}</option>)}
//         </select>
//     </label>

//     <label>
//         What programming languages or tools are you proficient in? Select all that apply or add your own.
//         {proficiencies.map((p, i) => (
//             <div key={i} className={`custom-checkbox ${proficiency.includes(p) ? 'checked' : ''}`} onClick={() => handleCheckboxClick(p)}>
//                 <FaCheckCircle className="checkbox-icon" />
//                 <span>{p}</span>
//             </div>
//         ))}
//     </label>

//     <label>
//         Do you have any specific interests or requirements for your projects? For example, do you want to use a certain API, work on a specific type of problem, or do you need the project to be suitable for beginners?
//         <textarea value={interests} onChange={(e) => setInterests(e.target.value)} />
//     </label>

//     <label>
//         What is the main purpose of your portfolio?
//         <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
//             {purposes.map((p, i) => <option key={i} value={p}>{p}</option>)}
//         </select>
//     </label>

//     <button type="submit">Submit</button>
// </form>
// </div>
// );