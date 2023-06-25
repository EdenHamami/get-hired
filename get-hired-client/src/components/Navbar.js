import React, { useState, useContext  } from 'react';
import './Navbar.css';
import { ResumeContext } from "../context/ResumeContext";
import {UserContext} from '../context/UserContext';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user, updateUser } = useContext(UserContext);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
  };
  
  const is_logged_in = () => {
    if (user.isLoggedIn) {
      navigate('/Menu');
  } else {
    navigate('/');
  }  
  };

  async function log_out(event) {
      localStorage.removeItem('token');
      updateUser('Guest', false)
      setDropdownVisible(!dropdownVisible);
      navigate('/LoginPage');
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="logo.png" alt="Logo" className="logo" />
        <a onClick={is_logged_in} className="nav-link">Home</a>
        <a href="/about" className="nav-link">About Us</a>
      </div>
      <div className="navbar-right">
        <img src="user.png" alt="User" className="user-img" onClick={toggleDropdown} />
        <div>
        <p className="welcome-text">Welcome {user.username}</p>
        {!user.isLoggedIn && <a href="/LoginPage" className="login-link">Login/Register</a>}
        </div>
        {dropdownVisible && user.isLoggedIn && (
          <div className="dropdown" onBlur={handleClickOutside} tabIndex="0">
            <a href="/MyCv" className="dropdown-item">My Resume</a>
            <a href="/SavedJobs" className="dropdown-item">Jobs I Liked</a>
            <a href="/MyInterview" className="dropdown-item">Last Interview</a>
            <a href="/MyExercises" className="dropdown-item">My Exercises</a>
            <a onClick={log_out} className="dropdown-item">Log Out</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
