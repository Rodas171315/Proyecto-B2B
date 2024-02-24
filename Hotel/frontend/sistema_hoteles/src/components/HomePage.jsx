import React, { useState } from 'react';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from './Rating'; 
import image1 from './image1.jpeg';
import { useCart } from './CartContext'; 
import HotelList from './HotelList'; 
import { useHotels } from './HotelsContext'; 

// Datos ficticios para la galería de imágenes
const galleryImages = [image1, image1, image1];


// Datos ficticios para las habitaciones
const roomTypes = [
  { type: "Doble", price: 120, maxPeople: 2, bedSize: "Queen", size: 20 },
  { type: "Junior Suite", price: 200, maxPeople: 4, bedSize: "King", size: 35 },

];

const HomePage = () => {
  const [comments, setComments] = useState(["Buena atención", "Excelente vista", "Perfecto para familias"]);
  const [rating, setRating] = useState(4.5); // Ejemplo de un rating por defecto
  const { addToCart } = useCart();
  const { hotels } = useHotels();


  const handleAddToCart = (room) => {
    addToCart({ ...room, roomType: room.type });
    alert(`Has añadido la habitación ${room.type} al carrito.`);
  };

  // Función para manejar el envío de un nuevo comentario
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.elements.comment.value;
    setComments([...comments, comment]);
    event.target.reset();
  };

  return (
    <Container className="my-5">
                  <h1>Hoteles Disponibles</h1>

                  <Row>
                {hotels.map((hotel, index) => (
                    <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={hotel.imageUrl || "placeholder.jpg"} /> {/* imagen por defecto */}
                            <Card.Body>
                                <Card.Title>{hotel.name}</Card.Title>
                                <Card.Text>
                                    {hotel.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => {/* acción al seleccionar el hotel */}}>
                                    Ver Detalles
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

      <Row>
        <Col md={6}>
          {/* Muestra la imagen principal del hotel */}
          <Image src={image1} alt="Hotel" fluid className="mb-3 main-hotel-image" />
          
          {/* Muestra la galería de imágenes */}
          <Row>
            {galleryImages.map((img, idx) => (
              <Col xs={6} md={4} key={idx} className="mb-3">
                <Image src={img} alt={`Hotel View ${idx + 1}`} fluid className="gallery-image" />
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Hyatt Hotel</h3>
              <Rating value={rating} text={`${comments.length} reviews`} />
              {/* Lista de comentarios */}
              {comments.map((comment, idx) => (
                <Card key={idx} className="my-3">
                  <Card.Body>{comment}</Card.Body>
                </Card>
              ))}
              {/* Formulario para nuevos comentarios */}
              <h4>Agregar Comentario</h4>
              <Form onSubmit={handleCommentSubmit}>
                <Form.Group controlId="comment">
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2">
                  Enviar
                </Button> 
              </Form>
            </ListGroup.Item>
            {/* Información sobre habitaciones */}
            {roomTypes.map((room, idx) => (
              <ListGroup.Item key={idx}>
                <h5>{room.type}</h5>
                <p>Precio: ${room.price} por noche</p>
                <p>Capacidad: Hasta {room.maxPeople} personas</p>
                <p>Tamaño de cama: {room.bedSize}</p>
                <p>Tamaño de habitación: {room.size} m²</p>
                <Button variant="success" className="mt-2" onClick={() => handleAddToCart(room)}>Agregar al Carrito</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>


        
      </Row>


      
    </Container>
  );
};

export default HomePage;
