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

const App = () => {
  return (
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
              <Route path="/login" element={<LoginPage />} /> {/* Ruta para iniciar sesión */}

              {/* Añadir más rutas según sea necesario */}
            </Routes>
          </div>
        </main>
        <Footer /> {/* Asegúrate de que el Footer se renderice aquí */}
      </div>
    </Router>
  );
};

export default App;
