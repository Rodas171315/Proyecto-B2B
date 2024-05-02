import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import BookingHistoryPage from './components/BookingHistoryPage';
import HotelDetailsPage from './components/HotelDetailsPage'; 
import CheckoutPage from './components/CheckoutPage'; 
import CartPage from './components/CartPage';
import AddHotelPage from './components/AddHotelPage';
import UserProfilePage from './components/UserProfilePage';
import AdministrarUsuarios from './components/AdministrarUsuarios';
import AddHabitacionPage from './components/AddHabitacionPage';
import PrivateRoute from './components/PrivateRoute';
import FAQs from './components/FAQs'; 
import AdministrarReservas from './components/AdministrarReservas';
import Analiticos from './components/Analiticos';
import { ReservationsProvider } from './components/ReservationsContext';
import { CartProvider } from './components/CartContext'; 
import { HotelsProvider } from './components/HotelsContext'; 
import { UserProvider, useUser } from './components/UserContext'; 
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user } = useUser(); // Usa el contexto de usuario

  const userHasRequiredRole = user && String(user.rol) === String(roleRequired);

  return userHasRequiredRole ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <UserProvider>
      <ReservationsProvider>
        <CartProvider>
          <HotelsProvider>
            <Router>
              <div className="App">
                <Header />
                <main role="main" className="flex-shrink-0">
                  <div className="container">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/registro" element={<RegisterPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/booking-history" element={<BookingHistoryPage />} />
                      <Route path="/hotel-details" element={<HotelDetailsPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/perfil" element={<UserProfilePage />} />
                      <Route path="/faqs" element={<FAQs />} />


                      {/* Rutas protegidas */}
                      <Route path="/add-hotel" element={<ProtectedRoute roleRequired='1'><AddHotelPage /></ProtectedRoute>} />
                      <Route path="/add-habitacion" element={<ProtectedRoute roleRequired='1'><AddHabitacionPage /></ProtectedRoute>} />
                      <Route path="/Administrar" element={<ProtectedRoute roleRequired='1'><AdministrarUsuarios /></ProtectedRoute>} />
                      <Route path="/AdministrarReservas" element={<ProtectedRoute roleRequired='1'><AdministrarReservas /></ProtectedRoute>} />
                      <Route path="/Analiticos" element={<ProtectedRoute roleRequired='1'><Analiticos /></ProtectedRoute>} />



                      
                    </Routes>
                  </div>
                </main>
                <Footer />
              </div>
            </Router>
          </HotelsProvider>
        </CartProvider>
      </ReservationsProvider>
    </UserProvider>
  );
};

export default App;