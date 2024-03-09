import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useUser } from './UserContext';

const BookingHistoryPage = () => {
  const [reservations, setReservations] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchReservations = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:8080/reservas/usuario/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setReservations(data);
          } else {
            console.error("No se pudieron obtener las reservas.");
          }
        } catch (error) {
          console.error("Error al obtener las reservas:", error);
        }
      }
    };

    fetchReservations();
  }, [user]);

  const handleCancel = async (idReserva) => {
    // Aquí, implementa la lógica para cancelar la reserva utilizando tu API.
    // Por ejemplo:
    try {
      const response = await fetch(`http://localhost:8080/reservas/cancelar/${idReserva}`, {
        method: 'PUT', // Asumiendo que tu API utiliza PUT para cancelar reservas.
      });
      if (response.ok) {
        // Actualiza el estado de las reservas para reflejar la cancelación.
        setReservations(prevReservations =>
          prevReservations.map(reserva =>
            reserva.idReserva === idReserva ? { ...reserva, estadoReserva: "Cancelada" } : reserva
          )
        );
      } else {
        console.error("Error al cancelar la reserva.");
      }
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
    }
  };

  return (
    <div className="booking-history-container">
      <h2 className="booking-history-title">Historial de Reservas</h2>
      {reservations.map((booking) => (
        <div key={booking.idReserva} className="booking-item">
          <h3>{booking.nombreHotel}</h3> {/* Asegúrate de que este campo exista en la respuesta de tu API */}
          <p>Check-in: {booking.fechaIngreso}</p>
          <p>Check-out: {booking.fechaSalida}</p>
          <p>Número de noches: {booking.noches}</p> {/* Calcula esto basado en las fechas si no viene de la API */}
          <p>Precio total: ${booking.totalReserva}</p>
          <p>Estado: {booking.estadoReserva}</p>
          {booking.estadoReserva !== "Cancelada" && (
            <Button variant="danger" onClick={() => handleCancel(booking.idReserva)}>
              Cancelar Reserva
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingHistoryPage;