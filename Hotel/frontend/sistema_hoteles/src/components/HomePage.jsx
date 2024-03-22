import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import defaultRoomImage from './roomImage.jpg';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const tiposHabitacion = {
    1: 'Doble',
    2: 'Junior Suite',
    3: 'Suite',
    4: 'Gran Suite'
  };


  useEffect(() => {
    fetchPaises();
    fetchHotelsAndRooms(paisSeleccionado);
  }, []);

  const fetchPaises = async () => {
    try {
      const response = await fetch('http://localhost:8080/hoteles/pais');
      if (!response.ok) throw new Error('Error al cargar los países');
      const data = await response.json();
      setPaises(data);
    } catch (error) {
      setError('Error al cargar los países: ' + error.message);
    }
  };

  const fetchHotelsAndRooms = async (pais = '') => {
    let url = pais ? `http://localhost:8080/hoteles/por-pais/${pais}` : `http://localhost:8080/hoteles`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al cargar hoteles');
      const hotelsData = await response.json();
  
      const hotelsWithRooms = await Promise.all(hotelsData.map(async (hotel) => {
        try {
          const roomsResponse = await fetch(`http://localhost:8080/habitaciones?hotelId=${hotel.id_hotel}`);
          if (!roomsResponse.ok) throw new Error('Failed to load rooms');
          const roomsData = await roomsResponse.json();
          return { ...hotel, rooms: roomsData.map(room => ({...room, tipo_habitacion: tiposHabitacion[room.tipo_habitacion]})) };
        } catch (error) {
          console.error('Error fetching rooms for hotel:', hotel.id_hotel, error);
          return { ...hotel, rooms: [] }; // Return the hotel with no rooms in case of error.
        }
      }));
  
      setHotels(hotelsWithRooms);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    fetchHotelsAndRooms(paisSeleccionado);
  };
  

  return (
    <Container className="my-5">
      <Row>
        <Col md={12}>
          <h2>Buscar Hoteles Disponibles</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="pais">
              <Form.Label>País</Form.Label>
              <Form.Control as="select" value={paisSeleccionado} onChange={(e) => setPaisSeleccionado(e.target.value)}>
                <option value="">Seleccione un país</option>
                {paises.map((pais, index) => (
                  <option key={index} value={pais}>{pais}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Buscar</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <React.Fragment key={hotel.id_hotel}>
              <Col md={12} className="mt-4">
                <h3>Hotel: {hotel.nombre}</h3>
                <p>{hotel.ciudad}, {hotel.pais}</p>
                <p>Dirección: {hotel.direccion}</p>
              </Col>
              {hotel.rooms && hotel.rooms.map((room) => (
                <Col key={room.id_habitacion} md={4}>
                  <Card className="mb-3">
                    <Card.Img variant="top" src={defaultRoomImage} />
                    <Card.Body>
                      <Card.Title>Habitación: {room.tipo_habitacion}</Card.Title>
                      <Card.Text>Número de habitación: {room.numero_habitacion}</Card.Text>
                      <Card.Text>Capacidad máxima: {room.capacidad_personas} personas</Card.Text>
                      <Card.Text>Precio por noche: ${room.precioxnoche}</Card.Text>
                      <Card.Text>Valoración: {room.valuacion} estrellas</Card.Text>
                      <Button variant="primary" onClick={() => navigate('/checkout', { state: { hotelDetails: hotel, roomDetails: room } })}>
                        Reservar
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </React.Fragment>
          ))
        ) : (
          <Col>
            <p className="mt-4">No se encontraron hoteles. Por favor, intenta nuevamente con diferentes criterios de búsqueda.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
