import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col, Table } from 'react-bootstrap';

const AddHotelPage = () => {
  const [hotelData, setHotelData] = useState({
    id_cadena: 100, // Suponiendo un valor predeterminado para el ejemplo
    nombre: '',
    pais: '',
    ciudad: '',
    direccion: '',
    checkin: '15:00:00',
    checkout: '11:00:00',
  });

  const [hoteles, setHoteles] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchHoteles = async () => {
      try {
        const response = await fetch('http://localhost:8080/hoteles');
        if (!response.ok) throw new Error('No se pudieron cargar los hoteles');
        const data = await response.json();
        setHoteles(data);
      } catch (error) {
        setErrorMessage('Error al cargar hoteles: ' + error.message);
      }
    };
    fetchHoteles();
  }, []);

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({ ...prev, [name]: value }));
  };

  const submitHotel = async () => {
    try {
      const response = await fetch('http://localhost:8080/hoteles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotelData),
      });
      if (!response.ok) throw new Error('Error al crear hotel');
      setSuccessMessage('Hotel creado exitosamente');
      // Opcional: Resetear el formulario aquí
    } catch (error) {
      setErrorMessage(error.message);
    }
  };


  return (
    <Container>
      <h1>Agregar Nuevo Hotel</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formHotelNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del hotel"
                name="nombre"
                value={hotelData.nombre}
                onChange={handleHotelChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formHotelPais">
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                placeholder="País"
                name="pais"
                value={hotelData.pais}
                onChange={handleHotelChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formHotelCiudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ciudad"
                name="ciudad"
                value={hotelData.ciudad}
                onChange={handleHotelChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formHotelDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dirección"
                name="direccion"
                value={hotelData.direccion}
                onChange={handleHotelChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={submitHotel}>Crear Hotel</Button>
      </Form>
      <h2 className="mt-5">Hoteles Disponibles</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>País</th>
            <th>Ciudad</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {hoteles.map((hotel) => (
            <tr key={hotel.id_hotel}>
              <td>{hotel.nombre}</td>
              <td>{hotel.pais}</td>
              <td>{hotel.ciudad}</td>
              <td>{hotel.direccion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Mensajes de éxito o error, si existen */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Container>
  );
};

export default AddHotelPage;
