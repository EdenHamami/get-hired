import React, { useState } from 'react';
import axios from "axios";
import { Link, Route, Routes ,useLocation , useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

  };
  const register = () => {
    navigate('/Menu');
    // axios.post('http://127.0.0.1:3001/register', { username: username, password: password }).then(res => {
      
  
    // });
  };
  return (
    <form onSubmit={register}>
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <label>
        Password verification:
        <input type="password" value={passwordVerification} onChange={(event) => setPasswordVerification(event.target.value)} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationPage;
