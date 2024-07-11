import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import './App.css'; // Import global styles

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="appContainer">
        <Routes>
          <Route path="/login" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
          {isLoggedIn && (
            <Route path="/" element={<Layout />}>
              {/* <Route index element={<About />} /> */}
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          )}
        </Routes>
        {isLoggedIn}
      </div>
    </Router>
  );
}

export default App;
