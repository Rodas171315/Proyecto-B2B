import React, { useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();

  // Definir correctamente handleGoBack dentro del componente
  const handleGoBack = () => {
    navigate(-1); // Navegar de regreso a la página anterior
  };

  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se integraría la lógica para procesar el pago
    console.log('Procesando pago con detalles: ', paymentDetails);
    // Navegar a alguna página de confirmación o resultado
    navigate('/payment-success'); // Asegúrate de tener esta ruta configurada
  };

  return (
    <Container className="my-5">
      <h2>Proceso de Pago</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="cardName">
          <Form.Label column sm={2}>Nombre en la Tarjeta</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="cardName"
              value={paymentDetails.cardName}
              onChange={handleInputChange}
              required
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
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">Procesar Pago</Button>
        <Button variant="secondary" onClick={handleGoBack} className="ms-2">Volver</Button>
      </Form>
    </Container>
  );
};

export default CheckoutPage;
