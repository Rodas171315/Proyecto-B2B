import React from 'react';
import { Button } from 'react-bootstrap';
import { useReservations } from './ReservationsContext';

const BookingHistoryPage = () => {
  const { reservations, cancelReservation } = useReservations();

  const handleCancel = (id) => {
    cancelReservation(id);
    // Puedes añadir más lógica aquí si es necesario, como mostrar un mensaje de confirmación
  };

  return (
    <div className="booking-history-container">
      <h2 className="booking-history-title">Historial de Reservas</h2>
      {reservations.map((booking) => (
        <div key={booking.id} className="booking-item">
          <h3>{booking.hotelName}</h3>
          <p>Check-in: {booking.checkIn}</p>
          <p>Check-out: {booking.checkOut}</p>
          <p>Número de noches: {booking.nights}</p>
          <p>Precio total: ${booking.price}</p>
          <p>Estado: {booking.status}</p>
          {booking.status !== "Cancelada" && (
            <Button variant="danger" onClick={() => handleCancel(booking.id)}>
              Cancelar Reserva
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingHistoryPage;
