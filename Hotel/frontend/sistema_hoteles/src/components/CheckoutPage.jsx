import React, { useState, useEffect } from 'react'; // Asegúrate de incluir useEffect aquí
import { Container, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReservations } from './ReservationsContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { addReservation } = useReservations();

  const { roomType, roomPrice } = location.state || { roomType: '', roomPrice: 0 };
  const { fromCart, cartItems } = location.state || { fromCart: false, cartItems: [] };

  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    checkIn: '',
    checkOut: '',
  });

  useEffect(() => {
    if (fromCart && cartItems.length > 0) {
      // Suponiendo que todos los ítems tienen las mismas fechas de check-in y check-out
      const { checkIn, checkOut } = cartItems[0];
      setPaymentDetails(prevDetails => ({
        ...prevDetails,
        checkIn: checkIn || '',
        checkOut: checkOut || '',
      }));
    }
  }, [fromCart, cartItems]);

  const calculateNights = () => {
    const checkInDate = new Date(paymentDetails.checkIn);
    const checkOutDate = new Date(paymentDetails.checkOut);
    const difference = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(difference / (1000 * 3600 * 24));
    return nights > 0 ? nights : 0;
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nights = calculateNights();
    const totalPrice = nights * (fromCart ? cartItems.reduce((acc, item) => acc + item.price, 0) / cartItems.length : roomPrice);
    
    const newReservation = {
      id: Date.now(),
      hotelName: roomType || "Doble",
      date: paymentDetails.checkOut,
      status: "Confirmada",
      price: totalPrice,
      nights,
      checkIn: paymentDetails.checkIn,
      checkOut: paymentDetails.checkOut,
    };

    addReservation(newReservation);
    setShowSuccessModal(true);
  };

  return (
    <Container className="my-5">
<Row>
  <Col sm={6}>
    <Form.Group as={Row} className="mb-3" controlId="checkIn">
      <Form.Label column sm={4}>Check-in</Form.Label>
      <Col sm={8}>
        <Form.Control
          type="date"
          name="checkIn"
          value={paymentDetails.checkIn}
          onChange={handleInputChange}
          required
        />
      </Col>
    </Form.Group>
  </Col>
  <Col sm={6}>
    <Form.Group as={Row} className="mb-3" controlId="checkOut">
      <Form.Label column sm={4}>Check-out</Form.Label>
      <Col sm={8}>
        <Form.Control
          type="date"
          name="checkOut"
          value={paymentDetails.checkOut}
          onChange={handleInputChange}
          required
        />
      </Col>
    </Form.Group>
  </Col>
</Row>


      <Form onSubmit={handleSubmit}>
{/* Resumen de la reserva */}
{roomType && (
  <div className="reservation-summary mb-4">
  <h4>Resumen de la Reserva</h4>
  <p><strong>Tipo de Habitación:</strong> {roomType}</p>
  <p><strong>Precio por noche:</strong> ${roomPrice}</p>
  <p><strong>Noches:</strong> {calculateNights()}</p>
  <p className="total-price"><strong>Precio Total:</strong> ${roomPrice * calculateNights()}</p>
</div>

)}

      <h2>Proceso de Pago</h2>
        {/* Información de la tarjeta */}
        <Form.Group as={Row} className="mb-3" controlId="cardName">
          <Form.Label column sm={2}>Nombre en la Tarjeta</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="cardName"
              value={paymentDetails.cardName}
              onChange={handleInputChange}
              required
              pattern="[a-zA-Z\s]+"
              title="El nombre debe contener solo letras y espacios."
            />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} className="mb-3" controlId="cardNumber">
          <Form.Label column sm={2}>Número de Tarjeta</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              required
              pattern="\d{16}"
              title="El número de tarjeta debe tener 16 dígitos."
            />
          </Col>
        </Form.Group>
        
        <Row>
          <Col sm={6}>
            <Form.Group as={Row} className="mb-3" controlId="expiryDate">
              <Form.Label column sm={4}>Fecha de Vencimiento</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="expiryDate"
                  placeholder="MM/AA"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  required
                  pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                  title="La fecha de vencimiento debe estar en formato MM/AA."
                />
              </Col>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group as={Row} className="mb-3" controlId="cvv">
              <Form.Label column sm={4}>CVV</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  required
                  pattern="\d{3}"
                  title="El CVV debe tener 3 dígitos."
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        
        {/* Dirección de Cobro */}
        <h4 className="mt-4">Dirección de Cobro</h4>
        <Form.Group as={Row} className="mb-3" controlId="address">
          <Form.Label column sm={2}>Dirección</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="address"
              value={paymentDetails.address}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>


        <Row>
          <Col sm={4}>
            <Form.Group as={Row} className="mb-3" controlId="city">
              <Form.Label column sm={4}>Ciudad</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="city"
                  value={paymentDetails.city}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Form.Group>
          </Col>
          
          <Col sm={4}>
            <Form.Group as={Row} className="mb-3" controlId="state">
              <Form.Label column sm={4}>Estado/Provincia</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="state"
                  value={paymentDetails.state}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
          </Col>
          
          <Col sm={4}>
            <Form.Group as={Row} className="mb-3" controlId="zip">
              <Form.Label column sm={4}>Código Postal</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="zip"
                  value={paymentDetails.zip}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group as={Row} className="mb-4" controlId="country">
          <Form.Label column sm={2}>País</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="country"
              value={paymentDetails.country}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        
        <Button variant="primary" type="submit">Procesar Pago</Button>
      </Form>
  
      {/* Modal de éxito */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pago Realizado con Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¡Tu pago ha sido procesado exitosamente! Revisa tu correo electrónico para más detalles.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
  
};

export default CheckoutPage;