import React, { useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import './RegistrationPage.css';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function register(event) {
    event.preventDefault();
    const response = await fetch('http://127.0.0.1:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.status === 200) {
      const d = await response.json();
      const token = d["token"]
      localStorage.setItem('token', token);
      navigate('/Menu', {state: {username: username}});
    } else {
      setErrorMessage('User already exist');
    }
  }
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
          <div className="validation-message">{errorMessage}</div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
