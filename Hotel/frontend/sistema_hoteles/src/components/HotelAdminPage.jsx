import React, { useState, useContext } from 'react';
import { Button, Form, Container, Row, Col, Table, Modal } from 'react-bootstrap';
import { HotelsContext } from './HotelsContext'; // Asegúrate de haber creado este contexto

const HotelAdminPage = () => {
  const { addHotel } = useContext(HotelsContext); // Utiliza el contexto para agregar hoteles
  const [showModal, setShowModal] = useState(false);
  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    description: '',
    rooms: []
  });
  const [roomData, setRoomData] = useState({
    type: '',
    price: 0,
    maxGuests: 0
  });

  const handleHotelChange = (event) => {
    const { name, value } = event.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleRoomChange = (event) => {
    const { name, value } = event.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const addRoomToHotel = () => {
    setHotelData({ ...hotelData, rooms: [...hotelData.rooms, roomData] });
    setRoomData({ type: '', price: 0, maxGuests: 0 }); // Reset room form
    setShowModal(false); // Close modal after adding
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addHotel(hotelData); // Función para agregar el hotel al estado global
    setHotelData({ name: '', location: '', description: '', rooms: [] }); // Reset form
  };

  return (
    <Container>
      <h2>Administración de Hoteles</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="hotelName">
              <Form.Label>Nombre del Hotel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce el nombre del hotel"
                name="name"
                value={hotelData.name}
                onChange={handleHotelChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="hotelLocation">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce la ubicación del hotel"
                name="location"
                value={hotelData.location}
                onChange={handleHotelChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="hotelDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Descripción del hotel"
            name="description"
            value={hotelData.description}
            onChange={handleHotelChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Agregar Hotel
        </Button>
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Añadir Habitación
        </Button>
      </Form>

      {/* Modal para añadir habitaciones al hotel */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Habitación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="roomType">
              <Form.Label>Tipo de Habitación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tipo de habitación"
                name="type"
                value={roomData.type}
                onChange={handleRoomChange}
              />
            </Form.Group>
            <Form.Group controlId="roomPrice">
              <Form.Label>Precio por Noche</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio"
                name="price"
                value={roomData.price}
                onChange={handleRoomChange}
              />
            </Form.Group>
            <Form.Group controlId="maxGuests">
              <Form.Label>Máximo de Huéspedes</Form.Label>
              <Form.Control
                type="number"
                placeholder="Máximo de huéspedes"
                name="maxGuests"
                value={roomData.maxGuests}
                onChange={handleRoomChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={addRoomToHotel}>
            Añadir Habitación
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Listado de habitaciones del hotel */}
      {hotelData.rooms.length > 0 && (
        <>
          <h3>Habitaciones Añadidas</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Precio por Noche</th>
                <th>Máx. Huéspedes</th>
              </tr>
            </thead>
            <tbody>
              {hotelData.rooms.map((room, index) => (
                <tr key={index}>
                  <td>{room.type}</td>
                  <td>${room.price}</td>
                  <td>{room.maxGuests}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default HotelAdminPage;