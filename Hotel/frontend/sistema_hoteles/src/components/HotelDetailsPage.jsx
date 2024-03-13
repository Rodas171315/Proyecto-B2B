import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import defaultRoomImage from './roomImage.jpg';

const HotelDetailsPage = () => {
  const [hotelDetails, setHotelDetails] = useState(null);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // Objeto para mapear los tipos de habitación
  const tiposHabitacion = {
    1: 'Doble',
    2: 'Junior Suite',
    3: 'Suite',
    4: 'Gran Suite'
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hoteles/1`);
        const data = await response.json();
        setHotelDetails(data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8080/habitaciones?hotelId=1');
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchHotelDetails();
    fetchRooms();
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col md={12}>
          <h2>Detalles del Hotel: {hotelDetails?.nombre}</h2>
          <p>{hotelDetails?.ciudad}, {hotelDetails?.pais}</p>
          <p>Dirección: {hotelDetails?.direccion}</p>
        </Col>
      </Row>
      <Row>
        {rooms.map(room => (
          <Col key={room.id_habitacion} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Habitación: {tiposHabitacion[room.tipo_habitacion]}</Card.Title>
                <Card.Text>Número de habitación: {room.numero_habitacion}</Card.Text>
                <Card.Text>Capacidad máxima: {room.capacidad_personas} personas</Card.Text>
                <Card.Text>Precio por noche: ${room.precioxnoche}</Card.Text>
                <Card.Text>Valoración: {room.valuacion} estrellas</Card.Text>
                <Card.Img variant="top" src={defaultRoomImage} />
                <Button variant="primary" onClick={() => {
  console.log("Navigating with hotelDetails:", hotelDetails);
  navigate('/checkout', {
    state: {
      hotelDetails: {
        ...hotelDetails,
      },
      roomDetails: {
        ...room,
        idHabitacion: room.id_habitacion,
        roomType: tiposHabitacion[room.tipo_habitacion],
        roomPrice: room.precioxnoche,
        capacidadPersonas: room.capacidad_personas
      }
    }
  });
}}>
  Reservar
</Button>


              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HotelDetailsPage;