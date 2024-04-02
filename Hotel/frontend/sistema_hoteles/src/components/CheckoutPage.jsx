import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';
import emailjs from 'emailjs-com';





const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { hotelDetails, roomDetails } = location.state;

  // Log para verificar los detalles del hotel recibidos
  console.log("Hotel details received:", hotelDetails);

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
    
    // Datos para verificar la disponibilidad
    const verificarDisponibilidadData = {
      idHabitacion: roomDetails.idHabitacion,
      fechaIngreso: formattedCheckIn,
      fechaSalida: formattedCheckOut,
    };

    const calculateNights = (checkIn, checkOut) => {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      return Math.ceil(diffTime / (1000 * 3600 * 24));
    };
  
    // Verificar disponibilidad primero
    const responseDisponibilidad = await fetch('http://localhost:8080/reservas/verificar-disponibilidad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(verificarDisponibilidadData),
    });
  
    const disponibilidad = await responseDisponibilidad.json();
  
    if (!disponibilidad.esDisponible) {
      alert('La habitación no está disponible para las fechas seleccionadas. Por favor, elige otras fechas.');
      return; // Detiene la función aquí si no hay disponibilidad
    }
  
    // Datos finales de la reserva, solo si la habitación está disponible
    const finalReservationData = {
      idHabitacion: roomDetails.idHabitacion,
      idHotel: hotelDetails.id_hotel, 
      idUsuario: user.id,
      codigoReserva: Math.floor(Math.random() * 1000000),
      fechaIngreso: formattedCheckIn,
      fechaSalida: formattedCheckOut,
      totalReserva: reservationData.totalReserva,
      personasReserva: roomDetails.capacidadPersonas,
    };
    
    console.log("Final reservation data being sent:", finalReservationData);
    console.log("Hotel ID being sent:", hotelDetails.id_hotel);  
    console.log("Hotel details received:", hotelDetails);
    console.log("Room details received:", roomDetails);
    
    try {
      // Verificar la disponibilidad de la habitación primero
      const responseDisponibilidad = await fetch('http://localhost:8080/reservas/verificar-disponibilidad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verificarDisponibilidadData),
      });
  
      const disponibilidad = await responseDisponibilidad.json();
      if (!disponibilidad.esDisponible) {
        alert('La habitación no está disponible para las fechas seleccionadas. Por favor, elige otras fechas.');
        return;
      }
  
      // Si la habitación está disponible, proceder a crear la reserva
      const finalReservationData = {
        idHabitacion: roomDetails.idHabitacion,
        idHotel: hotelDetails.id_hotel,
        idUsuario: user.id,
        codigoReserva: Math.floor(Math.random() * 1000000),
        fechaIngreso: formattedCheckIn,
        fechaSalida: formattedCheckOut,
        totalReserva: reservationData.totalReserva,
        personasReserva: roomDetails.capacidadPersonas,
      };


      const translateTipoHabitacion = (tipoHabitacion) => {
        const tiposHabitacion = {
          1: 'Doble',
          2: 'Junior Suite',
          3: 'Suite',
          4: 'Gran Suite'
        };
      
        return tiposHabitacion[tipoHabitacion] || "Tipo no especificado";
      };


  
      const response = await fetch('http://localhost:8080/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalReservationData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al crear la reserva: ${errorData.message}`);
      }
  

      const templateParams = {
        to_name: user.primer_nombre,
        hotel_name: hotelDetails.nombre,
        room_number: roomDetails.numero_habitacion?.toString() || "No especificado", 
        room_type: translateTipoHabitacion(roomDetails.tipo_habitacion) || "Tipo no especificado", 
        location: `${hotelDetails.ciudad}, ${hotelDetails.pais} - ${hotelDetails.direccion}`,
        check_in_date: formattedCheckIn,
        check_out_date: formattedCheckOut,
        total_nights: calculateNights(formattedCheckIn, formattedCheckOut).toString(),
        total_people: roomDetails.capacidadPersonas?.toString(),
        total_price: `$${reservationData.totalReserva.toFixed(2)}`,
        reservation_status: "confirmada",
        reservation_code: finalReservationData.codigoReserva.toString(), 
        to_email: user.email,
      };
  
      // Envía el correo electrónico utilizando EmailJS.
      emailjs.send('service_db-dw', 'template_0idkwyf', templateParams, 'BLyjSRydByFGcVhN6')
        .then((result) => {
          console.log('Email successfully sent!', result.text);
          setShowSuccessModal(true); // Muestra el modal de éxito
        }, (error) => {
          console.error('Failed to send email. Error: ', error.text);
          // Considera mostrar un mensaje de error específico relacionado con el fallo del envío del correo
        });
  
    } catch (error) {
      console.error('Error en la reserva:', error);
      alert('Hubo un error al procesar tu reserva. Por favor, intenta nuevamente.');
    }
  };
  


  const [isRoomAvailable, setIsRoomAvailable] = useState(true);
  useEffect(() => {
    const verificarDisponibilidad = async () => {
      if (reservationData.checkIn && reservationData.checkOut) {
        // Asumiendo que tienes una endpoint en tu API para verificar la disponibilidad
        try {
          const response = await fetch(`http://localhost:8080/verificar-disponibilidad`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              idHabitacion: roomDetails.idHabitacion,
              fechaIngreso: new Date(reservationData.checkIn).toISOString().split('T')[0],
              fechaSalida: new Date(reservationData.checkOut).toISOString().split('T')[0],
            }),
          });
          const disponibilidad = await response.json();
          setIsRoomAvailable(disponibilidad.esDisponible);
        } catch (error) {
          console.error('Error verificando disponibilidad:', error);
        }
      }
    };
    verificarDisponibilidad();
  }, [reservationData.checkIn, reservationData.checkOut, roomDetails.idHabitacion]);
  


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
        

        <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="cardNumber">
          <Form.Label>Número de Tarjeta</Form.Label>
          <Form.Control type="text" pattern="\d{16}" placeholder="1234 5678 9012 3456" maxLength="16" required />
          <Form.Text className="text-muted">
            Ingrese los 16 dígitos de su tarjeta de crédito sin espacios.
          </Form.Text>
        </Form.Group>
      </Col>
      <Col md={3}>
        <Form.Group controlId="cardExpiration">
          <Form.Label>Fecha de Expiración</Form.Label>
          <Form.Control type="month" required />
        </Form.Group>
      </Col>
      <Col md={3}>
        <Form.Group controlId="cardCVV">
          <Form.Label>CVV</Form.Label>
          <Form.Control type="text" pattern="\d{3}" placeholder="123" maxLength="3" required />
          <Form.Text className="text-muted">
            3 dígitos en el reverso de la tarjeta.
          </Form.Text>
        </Form.Group>
      </Col>
    </Row>

    <h4 className="mb-3">Dirección de Cobro</h4>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="billingAddressLine1">
          <Form.Label>Dirección (Línea 1)</Form.Label>
          <Form.Control type="text" placeholder="Calle y número" required />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="billingAddressLine2">
          <Form.Label>Dirección (Línea 2)</Form.Label>
          <Form.Control type="text" placeholder="Apartamento, suite, unidad, etc. (opcional)" />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="billingCity">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="billingStateProvince">
          <Form.Label>Estado/Provincia</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="billingPostalCode">
          <Form.Label>Código Postal</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="billingCountry">
          <Form.Label>País</Form.Label>
          <Form.Control as="select" defaultValue="Elija..." required>
            {/* Opciones de países */}
            <option>Elija...</option>
            <option>Estados Unidos</option>
            <option>México</option>
            <option>Canadá</option>

          </Form.Control>
        </Form.Group>
      </Col>
    </Row>




  {
    !isRoomAvailable && (
      <div className="alert alert-danger" role="alert">
        La habitación no está disponible para las fechas seleccionadas. Por favor, elige otras fechas.
      </div>
    )
  }
  <Button variant="primary" type="submit" disabled={!isRoomAvailable}>Confirmar Reserva</Button>
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
