import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
import CheckoutPage from './components/CheckoutPage'; // Asegúrate de importar el componente

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Ejemplo de cómo agregar el enlace en el Header */}
        <nav>
        </nav>
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
  );
};

export default App;
