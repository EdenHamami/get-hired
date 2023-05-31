import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './PortfolioProposals.css';

function PortfolioProposals() {
    const [field, setField] = useState('');
    const [proficiency, setProficiency] = useState([]);
    const [interests, setInterests] = useState('');
    const [purpose, setPurpose] = useState('');

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
        alert(`The user is interested in the field of ${field} and is proficient in the following programming languages/tools: ${proficiency.join(', ')}. They've specified that they are particularly interested in ${interests}. The main purpose of their portfolio is ${purpose}. Could you please provide a light project idea that would be suitable for their portfolio?`);
    };

    return (
        <div className="portfolio-proposals-container">
            <form onSubmit={handleSubmit}>

                <label>
                    Which field are you interested in?
                    <select value={field} onChange={(e) => setField(e.target.value)}>
                        {fields.map((f, i) => <option key={i} value={f}>{f}</option>)}
                    </select>
                </label>

                <label>
                    What programming languages or tools are you proficient in? Select all that apply or add your own.
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

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PortfolioProposals;
