import React, { useState } from 'react';
import axios from "axios";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import './RegistrationPage.css';
import Navbar from "../src/components/Navbar";

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const navigate = useNavigate();

  const register = () => {
    navigate('/Menu');
    // axios.post('http://127.0.0.1:3001/register', { username: username, password: password }).then(res => {
    // });
  };

  return (
    <div className="register-container">
      <div className="image-background"></div>
      <div className="input-form-container">
        <form onSubmit={register} className="input-form">
          <img src="./RegisterPageTitle.png" alt="Create an account" className="register-title-image" />
          <label>
          
            <div>Username:</div>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} pattern=".*[A-Z].*" title="Username must contain an uppercase letter." placeholder="Username" className="input-field" />
            {username && !username.match(/.*[A-Z].*/) && <div className="validation-message">Username must contain an uppercase letter.</div>}
          </label>
          <br />
          <label>
            <div>Password:</div>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" title="Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, and a number." placeholder="Password" className="input-field" />
            {password && !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) && <div className="validation-message">Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, and a number.</div>}
          </label>
          <br />
          <label>
          <div>Confirm Password:</div>
            <input type="password" value={passwordVerification} onChange={(event) => setPasswordVerification(event.target.value)} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" title="Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, and a number." placeholder="Confirm Password" className="input-field" />
            {passwordVerification && password !== passwordVerification && <div className="validation-message">Passwords must match.</div>}
          </label>
          <br />
          <p className="account-link">Do you have an account? <Link to="/loginPage">Click here to connect.</Link></p>
          <button type="submit" className="register-button">Register</button>
    
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
