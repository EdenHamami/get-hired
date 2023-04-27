import React, { useState } from 'react';
import axios from "axios";

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

  };
  const register = () => {
    axios.post('http://127.0.0.1:3001/register', { username: username, password: password }).then(res => {
      console.log(res);
    });
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
