import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useUser } from './UserContext';

const BookingHistoryPage = () => {
  const [reservations, setReservations] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);

  const tiposHabitacion = {
    1: 'Doble',
    2: 'Junior Suite',
    3: 'Suite',
    4: 'Gran Suite'
  };

  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);
  
  const fetchReservations = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reservas/detalle/usuario/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      } else {
        console.error("No se pudieron obtener las reservas.");
      }
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 3600 * 24));
  };

  const handleCancel = async (idReserva) => {
    console.log("Cancelando reserva", idReserva);
    // Aquí deberías implementar la lógica para cancelar la reserva
    await fetchReservations();
  };

  return (
    <div className="booking-history-container">
      <h2>Historial de Reservas</h2>
      {reservations.length > 0 ? reservations.map((reserva) => (
        <Card key={reserva.idReserva} className="mb-3">
          <Card.Body>
            <Card.Title>{reserva.nombreHotel} - {reserva.tipoHabitacion}</Card.Title>
            <Card.Subtitle>{reserva.ciudad}, {reserva.pais} - {reserva.direccion}</Card.Subtitle>
            <Card.Text>Check-in: {reserva.fechaIngreso}</Card.Text>
            <Card.Text>Check-out: {reserva.fechaSalida}</Card.Text>
            <Card.Text>Número de noches: {calculateNights(reserva.fechaIngreso, reserva.fechaSalida)}</Card.Text>
            <Card.Text>Personas: {reserva.capacidadPersonas}</Card.Text>
            <Card.Text>Total Reserva: ${reserva.totalReserva}</Card.Text>
            <Card.Text>Estado: {reserva.estadoReserva}</Card.Text>
            <Card.Text>Código de reserva: {reserva.codigoReserva}</Card.Text>
            {reserva.estadoReserva !== "Cancelada" && (
              <Button variant="danger" onClick={() => handleCancel(reserva.idReserva)}>Cancelar Reserva</Button>
            )}
          </Card.Body>
        </Card>
      )) : <p>No se encontraron reservas.</p>}
    </div>
  );
};

export default BookingHistoryPage;
