import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Form, Table, InputGroup, FormControl } from 'react-bootstrap';
import { useUser } from './UserContext';
import EditReservationPage from './EditReservationPage';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import emailjs from 'emailjs-com';


const AdministrarReservas = () => {
  const [reservations, setReservations] = useState([]);
  const { user } = useUser();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [editedReservation, setEditedReservation] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false); // para la vista
  const [userReservations, setUserReservations] = useState([]);  // para la vista
  const [searchCode, setSearchCode] = useState('');   // filtro
  const [filteredReservations, setFilteredReservations] = useState([]);  // filtro



  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);

  const fetchReservations = async () => {
    console.log('Fetching reservations for user:', user.id);
    try {
      const response = await fetch(`http://localhost:8080/reservas/detalle/todas`);
      if (response.ok) {
        const data = await response.json();
        console.log('Reservations fetched successfully:', data);
        setReservations(data.map(reserva => ({
          ...reserva,
          tipoHabitacion: translateTipoHabitacion(reserva.tipoHabitacion),
          idHotel: reserva.idHotel, 
          idHabitacion: reserva.idHabitacion,
          idUsuario: reserva.idUsuario
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
        await fetchReservations(); // Refresca lalista de reservaciones
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
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
  

  const openNotificarCambiosModal = (reserva) => {
    setCurrentReservation(reserva);
    setShowCommentModal(true);
  };


  

  const handleNotificarCambios = async (reserva) => {
    const translatedRoomType = translateTipoHabitacion(reserva.tipoHabitacion.toString());

    const templateParams = {
      to_name: user.primer_nombre,
      hotel_name: reserva.nombreHotel,
      room_number: reserva.numeroHabitacion.toString() || "No especificado", 
      room_type: reserva.tipoHabitacion, 
      location: `${reserva.ciudad}, ${reserva.pais} - ${reserva.direccion}`,
      check_in_date: reserva.fechaIngreso,
      check_out_date: reserva.fechaSalida,
      total_nights: calculateNights(reserva.fechaIngreso, reserva.fechaSalida).toString(),
      total_people: reserva.capacidadPersonas.toString(),
      total_price: `$${reserva.totalReserva.toFixed(2)}`,
      reservation_status: reserva.estadoReserva,
      reservation_code: reserva.codigoReserva.toString(), 
      to_email: user.email, 
      comment, 
    };

    try {
      await emailjs.send('service_db-dw2', 'template_vhblb7c', templateParams, '83TAqc_7hHgnfdESC');
      console.log('Email successfully sent!');
    } catch (error) {
      console.error('Error al enviar notificación de cambio:', error.text);
    }

    setShowCommentModal(false); // Cerrar modal
    setComment(''); // Limpiar comentario
  };


  const fetchUserReservations = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/reservas/historial/${userId}`);
      if (!response.ok) {
        throw new Error('No se pudo cargar el historial de reservas');
      }
      const historialReservas = await response.json();
      setUserReservations(historialReservas);
      setShowHistoryModal(true);  // Muestra el modal con el historial de reservas
    } catch (error) {
      console.error('Error al cargar el historial de reservas:', error);
    }
  };
  

  
  
  const formatToLocalDateString = (dateString) => {
    try {
      const date = new Date(dateString);
      if (!isNaN(date)) {
        return date.toLocaleDateString();
      }
    } catch (error) {
      console.error("Error al parsear la fecha:", error);
    }
    return "Fecha no disponible";
  };



const handleSearchChange = (e) => {
  setSearchCode(e.target.value);
};

const filterReservationsByCode = () => {
  if (!searchCode) {
    setFilteredReservations([]);
    return;
  }
  
  const filtered = reservations.filter(reserva => reserva.codigoReserva.toString() === searchCode);
  setFilteredReservations(filtered);
};

const showAllReservations = () => {
  // Restablecer el código de búsqueda
  setSearchCode('');
  // Restablecer las reservaciones filtradas a todas las reservaciones
  setFilteredReservations(reservations);
};



return (
  <div className="booking-history-container">
    <h2 className="text-center">Encontrar Reserva</h2>

    <InputGroup className="mb-3">
      <FormControl
        placeholder="Buscar por código de reserva"
        aria-label="Buscar por código de reserva"
        onChange={(e) => setSearchCode(e.target.value)}
      />
      <Button variant="outline-secondary" onClick={() => filterReservationsByCode()}>Buscar</Button>
      <Button variant="outline-info" onClick={() => showAllReservations()}>Mostrar Todas</Button>

    </InputGroup>

    {filteredReservations.length > 0 ? (
      filteredReservations.map((reserva) => (
        <Card key={reserva.idReserva} className="mb-4 shadow">
          <Card.Header as="h5" className="font-weight-bold">
            Reserva #{reserva.codigoReserva} - {reserva.correoElectronico}
          </Card.Header>
          <Card.Body>
            <Card.Title>{reserva.nombreHotel}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {reserva.ciudad}, {reserva.pais} - {reserva.direccion}
            </Card.Subtitle>
            <Card.Text>Tipo de habitación: {reserva.tipoHabitacion}</Card.Text>
            <Card.Text>Número de habitación: {reserva.numeroHabitacion}</Card.Text>
            <Card.Text>Check-in: {reserva.fechaIngreso}</Card.Text>
            <Card.Text>Check-out: {reserva.fechaSalida}</Card.Text>
            <Card.Text>Número de noches: {calculateNights(reserva.fechaIngreso, reserva.fechaSalida)}</Card.Text>
            <Card.Text>Personas: {reserva.capacidadPersonas}</Card.Text>
            <Card.Text>Total Reserva: ${reserva.totalReserva}</Card.Text>
            <Card.Text>Estado: {reserva.estadoReserva}</Card.Text>
            {reserva.estadoReserva !== "Cancelada" && (
              <>
                <Button variant="warning" onClick={() => handleEdit(reserva)}>Editar</Button>
                <Button variant="danger" onClick={() => cancelarReserva(reserva.idReserva)}>Cancelar</Button>
              </>
            )}
            <Button variant="info" onClick={() => downloadReservationPdf(reserva)}>Descargar</Button>
            <Button variant="warning" onClick={() => openNotificarCambiosModal(reserva)}>Notificar cambios</Button>
            <Button variant="secondary" onClick={() => fetchUserReservations(reserva.idUsuario)}>Ver Historial</Button>
          </Card.Body>
        </Card>
      ))
    ) : (
        <p className="text-center">No se encontraron reservas.</p>
      )}
      {currentReservation && (
        <EditReservationPage
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          reserva={currentReservation}
          actualizarReserva={actualizarReserva}
        />
        
      )}
            {/* Modal para el comentario */}
            <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Notificacion de cambios</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group>
      <Form.Label>Comentario</Form.Label>
      <Form.Control as="textarea" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} />
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowCommentModal(false)}>Cerrar</Button>
    <Button variant="primary" onClick={() => handleNotificarCambios(currentReservation)}>Enviar Notificación</Button>
  </Modal.Footer>
</Modal>


<Modal show={showHistoryModal} onHide={() => setShowHistoryModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Historial de Reservas del Usuario</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {userReservations.length > 0 ? (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Código de Reserva</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Estado</th>
            <th>Total Reserva</th>
          </tr>
        </thead>
        <tbody>
          {userReservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.codigoReserva}</td>
              <td>{formatToLocalDateString(reservation.fechaIngreso)}</td>
              <td>{formatToLocalDateString(reservation.fechaSalida)}</td>
              <td>{reservation.estadoReserva}</td>
              <td>${reservation.totalReserva ? reservation.totalReserva.toFixed(2) : "0.00"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    ) : (
      <p>No se encontraron reservas para este usuario.</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowHistoryModal(false)}>
      Cerrar
    </Button>
  </Modal.Footer>
</Modal>





    </div>
  );
};

export default AdministrarReservas;