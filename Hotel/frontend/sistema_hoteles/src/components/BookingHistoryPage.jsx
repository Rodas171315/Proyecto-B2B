import React from 'react';

const BookingHistoryPage = () => {
  const bookings = [
    { id: 1, hotelName: "Hotel Gala", date: "2024-02-25", status: "Confirmada" },
    { id: 2, hotelName: "Resort Playa Bonita", date: "2024-03-15", status: "Cancelada" },
  ];

  return (
    <div className="booking-history-container">
      <h2 className="booking-history-title">Historial de Reservas</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="booking-item">
          <h3>{booking.hotelName}</h3>
          <p>Fecha: {booking.date}</p>
          <p>Estado: {booking.status}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingHistoryPage;
