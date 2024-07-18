// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NavbarComponent from './components/Navbar';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
