import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import defaultRoomImage from './roomImage.jpg'; // Asegúrate de tener esta imagen como fallback


const HotelDetailsPage = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  // Objeto para mapear los tipos de habitación
  const tiposHabitacion = {
    1: 'Doble',
    2: 'Junior Suite',
    3: 'Suite',
    4: 'Gran Suite'
  };

  useEffect(() => {
    const fetchHotelsAndRooms = async () => {
      try {
        const hotelsResponse = await fetch(`http://localhost:8080/hoteles`);
        const hotelsData = await hotelsResponse.json();
        
        const roomTypesResponse = await fetch(`http://localhost:8080/tipos_habitacion`);
        const roomTypesData = await roomTypesResponse.json();
        const roomTypesMap = roomTypesData.reduce((acc, roomType) => {
          acc[roomType.id_tipo] = roomType.imagenUrl || defaultRoomImage;
          return acc;
        }, {});

        const hotelsWithRooms = await Promise.all(hotelsData.map(async (hotel) => {
          const roomsResponse = await fetch(`http://localhost:8080/habitaciones?hotelId=${hotel.id_hotel}`);
          const roomsData = await roomsResponse.json();
          const roomsWithImages = roomsData.map(room => ({
            ...room,
            imagenUrl: roomTypesMap[room.tipo_habitacion]
          }));
          return { ...hotel, rooms: roomsWithImages };
        }));

        setHotels(hotelsWithRooms);
      } catch (error) {
        console.error('Error fetching hotels and rooms:', error);
      }
    };

    fetchHotelsAndRooms();
  }, []);

  return (
    <Container className="my-5">
      {hotels.map((hotel) => (
        <React.Fragment key={hotel.id_hotel}>
          <Row>
            <Col md={12}>
              <h2>Hotel: {hotel.nombre}</h2>
              <p>{hotel.ciudad}, {hotel.pais}</p>
              <p>Dirección: {hotel.direccion}</p>
            </Col>
          </Row>
          <Row>
            {hotel.rooms.map((room) => (
              <Col key={room.id_habitacion} md={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Habitación: {tiposHabitacion[room.tipo_habitacion]}</Card.Title>
                    <Card.Text>Número de habitación: {room.numero_habitacion}</Card.Text>
                    <Card.Text>Capacidad máxima: {room.capacidad_personas} personas</Card.Text>
                    <Card.Text>Precio por noche: ${room.precioxnoche}</Card.Text>
                    <Card.Text>Valoración: {room.valuacion} estrellas</Card.Text>
                    <Card.Img variant="top" src={room.imagenUrl} />
                    <Button variant="primary" onClick={() => {
                      console.log("Navigating with hotelDetails:", hotel);
                      navigate('/checkout', {
                        state: {
                          hotelDetails: { ...hotel },
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
        </React.Fragment>
      ))}
    </Container>
  );
};

export default HotelDetailsPage;
