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
import { ReservationsProvider } from './components/ReservationsContext';
import { CartProvider } from './components/CartContext'; 
import { HotelsProvider } from './components/HotelsContext'; 
import { UserProvider } from './components/UserContext'; 

const App = () => {
  return (
    <UserProvider> 
    <ReservationsProvider>
      <CartProvider>
        <HotelsProvider> {/* Wrap the application with HotelsProvider */}
          <Router>
            <div className="App">
              <Header />
              <main role="main" className="flex-shrink-0">
                <div className="container">
                  <Routes>
                    <Route path="/" element={
                      <>
                        <h1 className="mt-5 elegant-header">Siempre más pasión por viajar. Elija entre hoteles en los mejores destinos.</h1>
                        <HomePage />
                      </>
                    } />
                    <Route path="/registro" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/booking-history" element={<BookingHistoryPage />} />
                    <Route path="/hotel-details" element={<HotelDetailsPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/add-hotel" element={<AddHotelPage />} />
                    <Route path="/add-habitacion" element={<AddHabitacionPage />} />
                    <Route path="/perfil" element={<UserProfilePage />} />
                    <Route path="/Administrar" element={<AdministrarUsuarios />} />
                  </Routes>
                </div>
              </main>
              <Footer />
            </div>
          </Router>
        </HotelsProvider>
      </CartProvider>
    </ReservationsProvider>
    </UserProvider> // UserProvider agregado aquí

  );
};

export default App;
