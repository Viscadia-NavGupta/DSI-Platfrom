import React from 'react';
import './About.css'; // Import your CSS for About page
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Settings, AccountCircle } from '@mui/icons-material'; // Import icons from Material-UI
import { useNavigate } from 'react-router-dom';

function About({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const buttonDetails = [
    { name: "Model Builder", url: "https://www.google.com", icon: <Settings /> },
    { name: "Assumption Catalogue", url: "https://www.google.com", icon: <Settings /> },
    { name: "Reporting Dashboard", url: "https://app.powerbi.com/links/I2wc05x7YI?ctid=c05372cf-28bd-4caf-83dd-e8b65c066ce9&pbi_source=linkShare", icon: <img src="/images/dashboard.svg" alt="Model Builder" className="iconsize" /> },
    { name: "Model Repository", url: "https://www.google.com", icon: <Settings /> },
    { name: "Scenario Repository", url: "https://www.google.com", icon: <Settings /> },
    { name: "Admin Module", url: "https://www.google.com", icon: <Settings /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleButtonClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="aboutContainer">
      <Grid container spacing={2} className="sectionsContainer">
        <Grid item xs={12} sm={3} className="leftSection">
          <div className="userIconContainer">
            <img src={`/images/Screenshot 2022-02-27 185105.png`} alt="User" className="userImage" />
          </div>
          <div className="aboutLinks">
            <Typography variant="h5" className="userName">Craig Bhai</Typography>
            <ul>
              <li>From Comercials Team</li>
              <li>Brand: Enhertu</li>
              <li>Location: USA</li>
              <li>Fave sport: Lacrosse</li>
              <li>Fav actor: Salu Bhai</li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={9} className="rightSection">
          <div className="rightside">
            <div className="welcomeContainer">
              <Typography variant="h4" className="welcomeText">
                Welcome to DSI Custom Forecasting Platform
                <span className="preparedLine">Prepared for DSI by Viscadia</span>
              </Typography>
            </div>
            <div className="buttonContainer">
              {buttonDetails.map((button, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} className="rightsection-item">
                  <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    style={{ backgroundColor: 'white', color: '#00BFFF' }}
                    onClick={() => handleButtonClick(button.url)}
                  >
                    {button.icon}
                    <span className="buttonText">{button.name}</span>
                  </Button>
                </Grid>
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
      <div className="footer">
        <img src="/images/viscadialogowhite.png" alt="Viscadia" className="footerLogo" />
        <p>Copyright 2024 © Viscadia. All rights reserved. <a href="/terms">Terms and conditions</a> • <a href="/privacy">Privacy policy</a></p>
      </div>
    </div>
  );
}

export default About;
