import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import Login from './Login'; 
import Register from './Register'; 
import AboutUs from './AboutUs';
import UserProfile from './UserProfile';
import UserAdministration from './UserAdministration';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/useradministration" element={<UserAdministration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
