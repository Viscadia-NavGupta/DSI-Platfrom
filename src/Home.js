import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as AWSConnections from './awsconnection'; // Import your AWSConnections module
import './Home.css'; // Import CSS file for styles

function Home({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      handleProceedClick(storedEmail, storedPassword);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/about'); // Redirect to the about page after login
  };

  const handleProceedClick = async (emailParam, passwordParam) => {
    const emailToUse = emailParam || email;
    const passwordToUse = passwordParam || password;

    if (!emailToUse || typeof emailToUse !== 'string' || !emailToUse.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const result = await AWSConnections.getCognitoAccessToken(emailToUse, passwordToUse);

    if (result.success) {
      setErrorMessage("");
      sessionStorage.setItem("username", emailToUse);
      localStorage.setItem('email', emailToUse);
      localStorage.setItem('password', passwordToUse);
      handleLogin(); // Call handleLogin from props
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleProceedClick();
    }
  };

  return (
    <div className="homeContainer">
      <div className="topHeader">
        <div className="logoContainer">
          <img src="/images/dsilogo.png" alt="Daiichi-Sankyo" className="topBarLogo" />
          <span className="topBarText">Daiichi-Sankyo</span>
        </div>
        <div className="viscadiaLogoContainer">
          <img src="/images/viscadialogo.png" alt="Viscadia" className="viscadiaLogo" />
        </div>
      </div>
      <div className="content">
        <h2 className="homeHeader">DSI Custom Forecast Platform</h2>
        <div className="homeForm">
          <input
            type="email"
            placeholder="Email"
            className="homeInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress} // Add key press event
          />
          <div className="passwordContainer">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="homeInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress} // Add key press event
            />
            <button
              type="button"
              className="showPasswordButton"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </button>
          </div>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          <div className="buttonContainer">
            <button className="homeButton" onClick={() => handleProceedClick(email, password)}>Login</button>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
      <div className="footer">
        <img src="/images/viscadialogowhite.png" alt="Viscadia" className="footerLogo" />
        <p>Copyright 2024 © Viscadia. All rights reserved. <Link to="/terms">Terms and conditions</Link> • <Link to="/privacy">Privacy policy</Link></p>
      </div>
    </div>
  );
}

export default Home;
