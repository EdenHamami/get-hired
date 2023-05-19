import React, { useState, useContext  } from 'react';
import './Navbar.css';
import { ResumeContext } from "../context/ResumeContext";
import {UserContext} from '../context/UserContext';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user } = useContext(UserContext);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="logo.png" alt="Logo" className="logo" />
        <a href="/" className="nav-link">Home</a>
        <a href="/about" className="nav-link">About Us</a>
      </div>
      <div className="navbar-right">
        <img src="user.png" alt="User" className="user-img" onClick={toggleDropdown} />
        <p>Welcome {user.username}</p>
        {dropdownVisible && (
          <div className="dropdown" onBlur={handleClickOutside} tabIndex="0">
            <a href="/my-cv" className="dropdown-item">My CV</a>
            <a href="/liked-jobs" className="dropdown-item">The Jobs I Liked</a>
            <a href="/my-exercises" className="dropdown-item">My Exercises</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
