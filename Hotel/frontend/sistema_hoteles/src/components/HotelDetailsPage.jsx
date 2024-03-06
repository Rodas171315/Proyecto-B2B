import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import defaultRoomImage from './roomImage.jpg';

const HotelDetailsPage = () => {
  const [hotelDetails, setHotelDetails] = useState(null);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const tiposHabitacion = {
    1: 'Doble',
    2: 'Junior Suite',
    3: 'Suite',
    4: 'Gran Suite'
  };

  useEffect(() => {
    // Reemplazar '1' con el ID del hotel que quieres mostrar
    const hotelId = 1;

    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hoteles/${hotelId}`);
        const data = await response.json();
        setHotelDetails(data);
      } catch (error) {
        console.error('Error al recuperar los detalles del hotel:', error);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8080/habitaciones');
        const data = await response.json();
        setRooms(data.filter(room => room.id_hotel === hotelId));
      } catch (error) {
        console.error('Error al recuperar las habitaciones:', error);
      }
    };

    fetchHotelDetails();
    fetchRooms();
  }, []);

  if (!hotelDetails) {
    return <Container>Cargando detalles del hotel...</Container>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={12}>
          <h2>Detalles del Hotel: {hotelDetails.nombre}</h2>
          <p>{hotelDetails.ciudad}, {hotelDetails.pais}</p>
          <p>Dirección: {hotelDetails.direccion}</p>
          {/* Aquí podrías incluir imágenes y otras propiedades del hotel */}
        </Col>
      </Row>
      <Row>
        {rooms.map((room) => (
          <Col key={room.id_habitacion} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Habitación: {tiposHabitacion[room.tipo_habitacion]}</Card.Title>
                <Card.Text>Precio por persona: ${room.precioxpersona}</Card.Text>
                <Card.Text>Precio por noche: ${room.precioxnoche}</Card.Text>
                <Card.Text>Capacidad máxima: {room.capacidad_personas} personas</Card.Text>
                <Card.Text>Número de habitación: {room.numero_habitacion}</Card.Text>
                <Card.Text>Disponible: {room.disponible ? 'Sí' : 'No'}</Card.Text>
                <Card.Img variant="top" src={defaultRoomImage} />
                <Button variant="primary" onClick={() => navigate('/checkout')}>Reservar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HotelDetailsPage;