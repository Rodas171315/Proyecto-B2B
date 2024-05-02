import React, { createContext, useContext, useState, useEffect } from 'react';

const ReservationsContext = createContext();

export const useReservations = () => useContext(ReservationsContext);

export const ReservationsProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const loadedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    setReservations(loadedReservations);
  }, []);

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservation) => {
    setReservations(prevReservations => [...prevReservations, reservation]);
  };

  const cancelReservation = (id) => {
    setReservations(prevReservations =>
      prevReservations.map(reservation =>
        reservation.id === id ? { ...reservation, status: "Cancelada" } : reservation
      )
    );
  };

  return (
    <ReservationsContext.Provider value={{ reservations, addReservation, cancelReservation }}>
      {children}
    </ReservationsContext.Provider>
  );
};
