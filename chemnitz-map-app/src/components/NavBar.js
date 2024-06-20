import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const NavBar = ({ username }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const navigate = useNavigate();

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/'); // Redirect to login page
  };

  return (
    <header className='header'>
      <h1>Facility Guide In Chemnitz</h1>
      <div className="user-info">
        <span>{username}</span>
        <div className="submenu-content">
          
          <div className={`submenu ${showSubMenu ? 'show' : ''}`}>
            
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
