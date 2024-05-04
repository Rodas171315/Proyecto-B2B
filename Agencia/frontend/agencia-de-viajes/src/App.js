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
import DestinoPopular from './DestinoPopular';
import CompraDestino from './CompraDestino';
import PromocionOfertaEspecialDetalles from './PromocionOfertaEspecialDetalles';
import CompraPromocion from './CompraPromocion';
import PrivateRoute from './PrivateRoute';
import PaquetesDisponibles from './PaquetesDisponibles';
import CompraPaquete from './CompraPaquete';
import AfiliadosComponent from './AfiliadosComponent';
import UserReservationsList from './UserReservationsList';
import AllReservationsList from './AllReservationsList';
import ListaPaquetes from './ListaPaquetes';
import CrearPaquete from './CrearPaquete';
import { ProveedoresProvider } from './ProveedoresContext';

function App() {
  return (
    <Router>
      <UserProvider>
      <ProveedoresProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/afiliados" element={<AfiliadosComponent />} />
            <Route path="/userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            <Route path="/lista-paquetes" element={<PrivateRoute><ListaPaquetes /></PrivateRoute>} />
            <Route path="/crear-paquete" element={<PrivateRoute><CrearPaquete /></PrivateRoute>} />
            <Route path="/reservations" element={<PrivateRoute><UserReservationsList /></PrivateRoute>} />
            <Route path="/allreservations" element={<PrivateRoute><AllReservationsList /></PrivateRoute>} />
            <Route path="/useradministration" element={<PrivateRoute><UserAdministration /></PrivateRoute>} />
            <Route path="/hospedajes-disponibles" element={<PrivateRoute><HospedajesDisponibles /></PrivateRoute>} />
            <Route path="/vuelos-disponibles" element={<PrivateRoute><VuelosDisponibles /></PrivateRoute>} />
            <Route path="/paquetes-disponibles" element={<PrivateRoute><PaquetesDisponibles /></PrivateRoute>} />
            <Route path="/hospedajes/:id" element={<PrivateRoute><DetallesHospedaje /></PrivateRoute>} />
            <Route path="/compra-vuelo" element={<PrivateRoute><CompraVuelo /></PrivateRoute>} />
            <Route path="/compra-paquete" element={<PrivateRoute><CompraPaquete /></PrivateRoute>} />
            <Route path="/comprahospedaje" element={<PrivateRoute><CompraHospedaje /></PrivateRoute>} />
            <Route path="/destinos-populares/:id" element={<PrivateRoute><DestinoPopular /></PrivateRoute>} />
            <Route path="/compra-destino/:id" element={<PrivateRoute><CompraDestino /></PrivateRoute>} />
            <Route path="/promocion/:id" element={<PrivateRoute><PromocionOfertaEspecialDetalles /></PrivateRoute>} />
            <Route path="/compra-promocion/:id" element={<PrivateRoute><CompraPromocion /></PrivateRoute>} />
          </Routes>
        </div>
        </ProveedoresProvider>
      </UserProvider>
    </Router>
  );
}

export default App;

