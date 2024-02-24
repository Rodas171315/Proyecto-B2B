import React, { useState } from 'react';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from './Rating'; 
import image1 from './image1.jpeg'; // Importa la imagen
import { useCart } from './CartContext'; 
 

// Datos ficticios para la galería de imágenes
const galleryImages = [image1, image1, image1];


// Datos ficticios para las habitaciones
const roomTypes = [
  { type: "Doble", price: 120, maxPeople: 2, bedSize: "Queen", size: 20 },
  { type: "Junior Suite", price: 200, maxPeople: 4, bedSize: "King", size: 35 },

];

const HotelDetailsPage = () => {
  const [comments, setComments] = useState(["Buena atención", "Excelente vista", "Perfecto para familias"]);
  const [rating, setRating] = useState(4.5); // Ejemplo de un rating por defecto
  const { addToCart } = useCart();



  const handleAddToCart = (room) => {
    addToCart(room);
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

export default HotelDetailsPage;
