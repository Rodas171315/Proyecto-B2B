import React, { createContext, useContext, useState, useEffect } from 'react';

const ReservationsContext = createContext();

export const useReservations = () => useContext(ReservationsContext);

export const ReservationsProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  // Cargar reservas al iniciar la aplicación
  useEffect(() => {
    const loadedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    setReservations(loadedReservations);
  }, []);

  // Guardar reservas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservation) => {
    setReservations((prevReservations) => [...prevReservations, reservation]);
  };

  return (
    <ReservationsContext.Provider value={{ reservations, addReservation }}>
      {children}
    </ReservationsContext.Provider>
  );
};
