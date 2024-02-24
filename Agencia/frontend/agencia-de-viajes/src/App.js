import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import Login from './Login'; 
import Register from './Register'; 
import AboutUs from './AboutUs';
import UserProfile from './UserProfile';
import UserAdministration from './UserAdministration';
import HospedajesDisponibles from './HospedajesDisponibles';
import VuelosDisponibles from './VuelosDisponibles';

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
          <Route path="/hospedajes-disponibles" element={<HospedajesDisponibles />} />
          <Route path="/vuelos-disponibles" element={<VuelosDisponibles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
