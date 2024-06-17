import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDataById } from '../api'; // Assuming you have an API function to fetch user data

const NavBar = ({ username }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const navigate = useNavigate();

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className='header'>
      <h1>Facilities in Chemnitz</h1>
      <div className="user-info">
        <span>{username}</span>
        <div className="submenu-content">
          {/* <i className="bi bi-list" onClick={toggleSubMenu}></i> */}
          <div className={`submenu ${showSubMenu ? 'show' : ''}`}>
            {/* <Link to="/userprofile">View Profile</Link> */}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
