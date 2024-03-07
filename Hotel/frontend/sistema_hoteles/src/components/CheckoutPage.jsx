import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { hotelDetails, roomDetails } = location.state;

  const [reservationData, setReservationData] = useState({
    checkIn: '',
    checkOut: '',
    totalReserva: 0,
  });

  const calculateTotalReserva = () => {
    if (reservationData.checkIn && reservationData.checkOut && roomDetails.roomPrice) {
      const checkInDate = new Date(reservationData.checkIn);
      const checkOutDate = new Date(reservationData.checkOut);
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
      const totalReservaCalculado = diffDays * roomDetails.roomPrice;
      setReservationData(prevState => ({
        ...prevState,
        totalReserva: totalReservaCalculado,
      }));
    }
  };

  useEffect(() => {
    calculateTotalReserva();
  }, [reservationData.checkIn, reservationData.checkOut, roomDetails.roomPrice]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReservationData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedCheckIn = new Date(reservationData.checkIn).toISOString().split('T')[0];
    const formattedCheckOut = new Date(reservationData.checkOut).toISOString().split('T')[0];
    
    const finalReservationData = {
      idHabitacion: roomDetails.idHabitacion, // Asegúrate de que coincide con el backend
      idUsuario: user.id, // Asegúrate de que coincide con el backend
      codigoReserva: Math.floor(Math.random() * 1000000), // Asegúrate de que este campo se maneje correctamente en el backend si es necesario
      fechaIngreso: formattedCheckIn, // Nombre del campo actualizado para coincidir con el backend
      fechaSalida: formattedCheckOut, // Nombre del campo actualizado para coincidir con el backend
      totalReserva: reservationData.totalReserva // Asegúrate de que coincide con el backend
    };

    console.log("Final reservation data being sent:", finalReservationData);

    try {
      const response = await fetch('http://localhost:8080/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalReservationData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la reserva');
      }

      setShowSuccessModal(true);
    } catch (error) {
      alert('Hubo un error al procesar tu reserva. Por favor, intenta nuevamente.');
      console.error('Error en la reserva:', error);
    }
  };

  return (
    <Container className="my-5">
      <h2>Checkout de la Reserva</h2>
      {/* Detalles del hotel y la habitación */}
      {hotelDetails && (
        <div>
          <p>Reservando en: {hotelDetails.nombre}, {hotelDetails.ciudad}, {hotelDetails.pais}</p>
          <p>Tipo de habitación: {roomDetails.roomType}, Precio por noche: ${roomDetails.roomPrice}</p>
          <p>Total estimado: ${reservationData.totalReserva.toFixed(2)}</p>
        </div>
      )}

      {/* Formulario de reserva */}
      <Form onSubmit={handleSubmit}>
        {/* Fechas de check-in y check-out */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="checkIn">
              <Form.Label>Fecha de Check-In</Form.Label>
              <Form.Control type="date" name="checkIn" value={reservationData.checkIn} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="checkOut">
              <Form.Label>Fecha de Check-Out</Form.Label>
              <Form.Control type="date" name="checkOut" value={reservationData.checkOut} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">Confirmar Reserva</Button>
      </Form>

      {/* Modal de éxito */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reserva Confirmada</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tu reserva ha sido confirmada con éxito.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CheckoutPage;
