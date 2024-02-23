import React from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import roomImage from './roomImage.jpg';
import amenityImage from './amenityImage.jpg';

const hotelAmenities = [
  { 
    id: 1, 
    name: "Piscina", 
    images: [amenityImage, amenityImage, amenityImage, amenityImage, amenityImage] 
  },
];

const roomTypes = [
  { id: 1, type: "Doble", price: 120, image: roomImage },
  { id: 2, type: "Junior Suite", price: 200, image: roomImage },
  { id: 3, type: "Suite", price: 300, image: roomImage },
  { id: 4, type: "Gran Suite", price: 450, image: roomImage },
];

const HotelDetailsPage = () => {
  return (
    <Container className="my-5">
      <h2>Detalles del Hotel Gala</h2>
      <Row>
        <Col md={12}>
          <h3>Amenidades</h3>
          <Row>
            {hotelAmenities.map((amenity) => (
              amenity.images.map((image, index) => (
                <Col key={index} md={4} lg={2} className="mb-3">
                  <Card>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                      {index === 0 ? <Card.Title>{amenity.name}</Card.Title> : null}
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ))}
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h3>Tipos de Habitación</h3>
          <Row>
            {roomTypes.map((room) => (
              <Col key={room.id} md={6} lg={3}>
                <Card className="mb-3">
                  <Card.Img variant="top" src={room.image} />
                  <Card.Body>
                    <Card.Title>{room.type}</Card.Title>
                    <Card.Text>Precio: ${room.price} por noche</Card.Text>
                    <Button variant="primary">Reservar</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HotelDetailsPage;
