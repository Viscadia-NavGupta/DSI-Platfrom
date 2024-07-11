import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.css'; // Import CSS file for styles
import Button from '@mui/material/Button';
import { Notifications, Settings, ExitToApp } from '@mui/icons-material'; // Import icons from Material-UI

function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove email and password from localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('password');

    // Log the user out and navigate to the login page
    navigate('/login');
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logoContainer">
          <img src="/images/dsilogo.png" alt="Daiichi-Sankyo" className="logoImage" />
          <h1 className="logoText">Daiichi-Sankyo</h1>
        </div>
        <nav className="nav">
          <ul className="navList">
            {/* <li className="navItem"><a href="/" className="navLink">Home</a></li>
            <li className="navItem"><a href="/about" className="navLink">Custom Forecast Platform</a></li>
            <li className="navItem"><a href="/contact" className="navLink">Support</a></li> */}
          </ul>
        </nav>
        <div className="headerActions">
          <Button variant="contained" color="primary" startIcon={<ExitToApp />} onClick={handleLogout}>
            Logout
          </Button>
          <Notifications className="icon" />
          <Settings className="icon" />
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
