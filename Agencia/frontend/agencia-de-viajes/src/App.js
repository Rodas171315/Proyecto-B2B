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
import DetallesHospedaje from './DetallesHospedaje';
import { UserProvider } from './UserContext'; 
import CompraVuelo from './CompraVuelo';
import CompraHospedaje from './CompraHospedaje';

function App() {
  return (
    <Router>
      <UserProvider>
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
          <Route path="/hospedajes/:id" element={<DetallesHospedaje />} />
          <Route path="/compra-vuelo" element={<CompraVuelo />} />
          <Route path="/comprahospedaje" element={<CompraHospedaje />} />
        </Routes>
      </div>
      </UserProvider> 
    </Router>
    
    
  );
}

export default App;
