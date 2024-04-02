import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useUser } from './UserContext';
import EditReservationPage from './EditReservationPage';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BookingHistoryPage = () => {
  const [reservations, setReservations] = useState([]);
  const { user } = useUser();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [editedReservation, setEditedReservation] = useState(null);

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
          tipoHabitacion: translateTipoHabitacion(reserva.tipoHabitacion),
          idHotel: reserva.idHotel, // Asegúrate de que estás incluyendo esta línea
          idHabitacion: reserva.idHabitacion
        })));
      } else {
        console.error("Failed to fetch reservations.");
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  // a numero
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

  const cancelarReserva = async (idReserva) => {
    try {
      const response = await fetch(`http://localhost:8080/reservas/${idReserva}/cancelar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('No se pudo cancelar la reserva');
      }
      alert('Reserva cancelada con éxito');
      fetchReservations(); //error tipográfico.
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      alert('Error al cancelar la reserva');
    }
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
        if (response.status === 409) {
          // Conflicto , notifica al usuario
          alert("Habitación no disponible.");
        } else {
          // Otro tipo de error HTTP
          throw new Error(`Reservation update failed: ${response.statusText}`);
        }
      } else {
        console.log('Reservation updated successfully');
        setShowEditModal(false);
        await fetchReservations(); // Refresh the list of reservations
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
      // Maneja el error genérico
      alert("Ocurrió un error al actualizar la reserva. Por favor, intenta de nuevo.");
    }
  };
  


  const downloadReservationPdf = (reserva) => {
    const doc = new jsPDF();
    doc.text("Detalle de Reserva", 14, 16);
    doc.setFontSize(10);

    // Información de la reserva
    const reservationDetails = [
      { title: "Hotel", data: reserva.nombreHotel },
      { title: "Número de habitación", data: reserva.numeroHabitacion.toString() }, 
      { title: "Tipo de habitación", data: reserva.tipoHabitacion },
      { title: "Ubicación", data: `${reserva.ciudad}, ${reserva.pais} - ${reserva.direccion}` },
      { title: "Check-in", data: reserva.fechaIngreso },
      { title: "Check-out", data: reserva.fechaSalida },
      { title: "Número de noches", data: calculateNights(reserva.fechaIngreso, reserva.fechaSalida).toString() },
      { title: "Personas", data: reserva.capacidadPersonas.toString() },
      { title: "Total Reserva", data: `$${reserva.totalReserva}` },
      { title: "Estado", data: reserva.estadoReserva },
      { title: "Código de reserva", data: reserva.codigoReserva },
    ];

    doc.autoTable({
      head: [["Detalle", "Información"]],
      body: reservationDetails.map((item) => [item.title, item.data]),
      startY: 20,
    });

    doc.save(`Reserva_${reserva.codigoReserva}.pdf`);
  };

  return (
    <div className="booking-history-container">
      <h2>Historial de Reservas</h2>
      {reservations.length > 0 ? reservations.map((reserva) => (
        <Card key={reserva.idReserva} className="mb-3">
          <Card.Body>
          <Card.Title>
          {reserva.nombreHotel} - Tipo de habitación: {reserva.tipoHabitacion} - Número de habitación: {reserva.numeroHabitacion}
        </Card.Title>            <Card.Subtitle>{reserva.ciudad}, {reserva.pais} - {reserva.direccion}</Card.Subtitle>
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
                <Button variant="danger" onClick={() => cancelarReserva(reserva.idReserva)}>Cancelar Reserva</Button>
              </>
            )}
                      <Button variant="info" onClick={() => downloadReservationPdf(reserva)}>Descargar Reserva</Button>

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
