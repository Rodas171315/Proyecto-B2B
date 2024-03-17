import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useUser } from './UserContext';
import EditReservationPage from './EditReservationPage';

const BookingHistoryPage = () => {
  const [reservations, setReservations] = useState([]);
  const { user } = useUser();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

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
        console.error("Failed to fetch reservations.");
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 3600 * 24));
  };

  const handleEdit = (reserva) => {
    setCurrentReservation(reserva);
    setShowEditModal(true);
  };

  const handleCancel = async (idReserva) => {
    console.log("Cancelando reserva", idReserva);
    // Implement cancellation logic here
    await fetchReservations();
  };



  const actualizarReserva = async (reservaActualizada) => {
    console.log('Updating reservation with:', reservaActualizada);
    try {
      const response = await fetch(`http://localhost:8080/reservas/${reservaActualizada.idReserva}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservaActualizada),
      });

      if (!response.ok) {
        throw new Error(`Reservation update failed: ${response.statusText}`);
      }
      console.log('Reservation updated successfully');
      setShowEditModal(false);
      fetchReservations(); // Refresh the list of reservations to reflect the changes
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
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
              <>
                <Button variant="warning" onClick={() => handleEdit(reserva)}>Editar Reserva</Button>
                <Button variant="danger" onClick={() => handleCancel(reserva.idReserva)} className="ms-2">Cancelar Reserva</Button>
              </>
            )}
          </Card.Body>
        </Card>
      )) : <p>No se encontraron reservas.</p>}
      {currentReservation && (
        <EditReservationPage
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          reserva={currentReservation}
          actualizarReserva={actualizarReserva}
        />
      )}
    </div>
  );
};

export default BookingHistoryPage;