// HotelSearchForm.jsx NO IMPLEMENTADO 
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const HotelSearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    destino: '',
    checkIn: '',
    checkOut: '',
    huespedes: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Parámetros de búsqueda', searchParams);
  };

  return (
    <Form onSubmit={handleSubmit} className="search-form">
      <Row>
        <Col sm={12} md={3}>
          <Form.Group controlId="formDestino">
            <Form.Label>Destino</Form.Label>
            <Form.Control
              type="text"
              name="destino"
              value={searchParams.destino}
              onChange={handleInputChange}
              placeholder="Ingrese el destino"
            />
          </Form.Group>
        </Col>
        <Col sm={6} md={3}>
          <Form.Group controlId="formCheckIn">
            <Form.Label>Check-in</Form.Label>
            <Form.Control
              type="date"
              name="checkIn"
              value={searchParams.checkIn}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col sm={6} md={3}>
          <Form.Group controlId="formCheckOut">
            <Form.Label>Check-out</Form.Label>
            <Form.Control
              type="date"
              name="checkOut"
              value={searchParams.checkOut}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col sm={6} md={3}>
          <Form.Group controlId="formHuespedes">
            <Form.Label>Número de Huéspedes</Form.Label>
            <Form.Control
              type="number"
              name="huespedes"
              value={searchParams.huespedes}
              onChange={handleInputChange}
              min="1"
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" className="mt-3">
        Buscar Hoteles
      </Button>
    </Form>
  );
};

export default HotelSearchForm;