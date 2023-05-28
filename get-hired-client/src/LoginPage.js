// LoginPage.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css';
import Navbar from "../src/components/Navbar";
import {UserContext} from './context/UserContext';
function LoginPage() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  async function login(event) {
    event.preventDefault();
    const response = await fetch('http://127.0.0.1:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userName, password: password }),
    });
    if (response.status === 200) {
      updateUser(userName,true)
      
      const d = await response.json();
      const token = d["token"]
      
      // After successful login
      localStorage.setItem('token', token);
      navigate('/Menu');
    } else {
      setErrorMessage('Wrong UserName or password');
    }
  
  }
  return (

    <div className="login-container">
      <div className="login-image-background"></div>
      <div className="login-input-form-container">
        <form onSubmit={login} className="login-input-form">
          <img src="./LoginPageTitle.png" alt="Login" className="login-title-image" />
          <label>
            <div>Username:</div>
            <input type="text" value={userName} onChange={(event) => setUsername(event.target.value)} placeholder="UserName" className="login-input-field" />
          </label>
          <br />
          <label>
            <div>Password:</div>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="login-input-field" />
          </label>
          <br />
          <p className="login-account-link">Don't have an account? <Link to="/RegistrationPage">Click here to register.</Link></p>
          <button type="submit" className="login-button">Login</button>
          <p className="validation-message">{errorMessage}</p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
