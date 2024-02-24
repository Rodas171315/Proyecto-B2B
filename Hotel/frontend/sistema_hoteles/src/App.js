import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import HotelSearchForm from './components/HotelSearchForm';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import BookingHistoryPage from './components/BookingHistoryPage';
import HotelDetailsPage from './components/HotelDetailsPage'; 
import CheckoutPage from './components/CheckoutPage'; 
import { ReservationsProvider } from './components/ReservationsContext';
import { CartProvider } from './components/CartContext'; // Asegúrate de que la ruta de importación sea correcta

const App = () => {
  return (
    <ReservationsProvider>
      <CartProvider> {/* Envuelve tu aplicación o las rutas relevantes con CartProvider */}
        <Router>
          <div className="App">
            <Header />
            <main role="main" className="flex-shrink-0">
              <div className="container">
                <Routes>
                  <Route path="/" element={
                    <>
                      <h1 className="mt-5 elegant-header">Siempre más pasión por viajar. Elija entre hoteles en los mejores destinos.</h1>
                      <HotelSearchForm />
                      <HomePage />
                    </>
                  } />
                  <Route path="/registro" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/booking-history" element={<BookingHistoryPage />} />
                  <Route path="/hotel-details" element={<HotelDetailsPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ReservationsProvider>
  );
};

export default App;
