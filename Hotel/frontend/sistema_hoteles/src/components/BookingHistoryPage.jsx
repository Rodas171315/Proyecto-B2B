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
    console.log('Fetching reservations for user:', user.id);
    try {
      const response = await fetch(`http://localhost:8080/reservas/detalle/usuario/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Reservations fetched successfully:', data);
        setReservations(data.map(reserva => ({
          ...reserva,
          // Assuming you've updated your backend to return tipoHabitacion as a number
          tipoHabitacion: translateTipoHabitacion(reserva.tipoHabitacion), // Translate tipoHabitacion to a readable format if needed
        })));
      } else {
        console.error("Failed to fetch reservations.");
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  // Function to translate tipoHabitacion number to a readable string (if necessary)
  const translateTipoHabitacion = (tipoHabitacion) => {
    const tipoHabitacionMap = {
      1: "Doble",
      2: "Junior Suite",
      3: "Suite",
      4: "Gran Suite",
    };
    return tipoHabitacionMap[tipoHabitacion] || "Unknown";
  };

  const calculateNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 3600 * 24));
  };

  const handleEdit = (reserva) => {
    console.log('Opening edit modal for reservation:', reserva.idReserva);
    setCurrentReservation(reserva);
    setShowEditModal(true);
  };

  const handleCancel = async (idReserva) => {
    console.log("Canceling reservation", idReserva);
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
            <Card.Title>{reserva.nombreHotel} - Tipo de habitación: {reserva.tipoHabitacion}</Card.Title>
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
