import React, { useState } from 'react';
import { Container, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para controlar la visibilidad del modal
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
    console.log('Procesando pago con detalles: ', paymentDetails);
    setShowSuccessModal(true); // Muestra el modal de éxito tras procesar el pago
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
              pattern="[a-zA-Z\s]+" // Solo permite letras y espacios
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
              pattern="\d{16}" // Suponiendo que todos los números de tarjeta tienen 16 dígitos
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
                  pattern="(0[1-9]|1[0-2])\/[0-9]{2}" // MM/AA
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
                  pattern="\d{3}" // Suponiendo que el CVV tiene 3 dígitos
                  title="El CVV debe tener 3 dígitos."
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
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
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CheckoutPage;
