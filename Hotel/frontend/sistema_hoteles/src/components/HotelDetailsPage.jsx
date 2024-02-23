import React from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import roomImage from './roomImage.svg';
import amenityImage from './amenityImage.svg';


const hotelAmenities = [
  // Lista tus amenidades aquí con imágenes
  { id: 1, name: "Piscina", image: amenityImage },
  { id: 2, name: "Spa", image: amenityImage },

];

const roomTypes = [
  // Detalles de tipos de habitaciones
  { id: 1, type: "Doble", price: 120, image: roomImage },
  { id: 2, type: "Junior Suite", price: 200, image: roomImage },

];

const HotelDetailsPage = () => {
  return (
    <Container className="my-5">
      <h2>Detalles del Hotel</h2>
      <Row>
        <Col md={6}>
          <h3>Amenidades</h3>
          {hotelAmenities.map((amenity) => (
            <Card key={amenity.id} className="mb-3">
              <Card.Img variant="top" src={amenity.image} />
              <Card.Body>
                <Card.Title>{amenity.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={6}>
          <h3>Tipos de Habitación</h3>
          {roomTypes.map((room) => (
            <Card key={room.id} className="mb-3">
              <Card.Img variant="top" src={room.image} />
              <Card.Body>
                <Card.Title>{room.type}</Card.Title>
                <Card.Text>Precio: ${room.price} por noche</Card.Text>
                <Button variant="primary">Reservar</Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default HotelDetailsPage;