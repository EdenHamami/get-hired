// LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css';
import Navbar from "../src/components/Navbar";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = () => {
    navigate('/Menu');
    // axios.post('http://127.0.0.1:3001/login', { username: username, password: password }).then(res => {
    // });
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-image-background"></div>
        <div className="login-input-form-container">
          <form onSubmit={login} className="login-input-form">
            <img src="./LoginPageTitle.png" alt="Login" className="login-title-image" />
            <label>
              <div>Username:</div>
              <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" className="login-input-field" />
            </label>
            <br />
            <label>
              <div>Password:</div>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="login-input-field" />
            </label>
            <br />
            <p className="login-account-link">Don't have an account? <Link to="/RegistrationPage">Click here to register.</Link></p>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
