import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Image, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import defaultRoomImage from './roomImage.jpg';
import Comentarios from './Comentarios';

const HotelDetailsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [hotelImages, setHotelImages] = useState({}); 
  const [roomTypes, setRoomTypes] = useState({});



  const tiposHabitacion = {
    1: 'Doble',
    2: 'Junior Suite',
    3: 'Suite',
    4: 'Gran Suite'
  };


  useEffect(() => {
    fetchRoomTypes();
    fetchPaises();
    fetchHotelsAndRooms(paisSeleccionado);
  }, []);


  const [filterCapacity, setFilterCapacity] = useState('');

  // Función para filtrar habitaciones por capacidad de personas
  const filterRoomsByCapacity = (capacity) => {
    if (!capacity) return; // Si no se ha proporcionado capacidad, no se hace nada

    // Filtra los hoteles cuyas habitaciones coincidan con la capacidad de personas
    const filteredHotels = hotels.map(hotel => {
      const filteredRooms = hotel.rooms.filter(room => room.capacidad_personas === parseInt(capacity));
      return { ...hotel, rooms: filteredRooms };
    }).filter(hotel => hotel.rooms.length > 0); // Filtra hoteles sin habitaciones que coincidan

    setHotels(filteredHotels);
  };

  const handleFilterRooms = (e) => {
    e.preventDefault();
    filterRoomsByCapacity(filterCapacity);
  };




  //IMAGENES

  const fetchHotelImages = async (idHotel) => {
    try {
      const response = await fetch(`http://localhost:8080/hoteles/${idHotel}/imagenes`);
      if (!response.ok) throw new Error('Error al cargar imágenes del hotel');
      const images = await response.json();
      setHotelImages(prevImages => ({ ...prevImages, [idHotel]: images }));
    } catch (error) {
      console.error('Error fetching hotel images:', error);
    }
  };

  useEffect(() => {
    hotels.forEach((hotel) => {
      fetchHotelImages(hotel.id_hotel);
    });
  }, [hotels]);

  

  const fetchRoomTypes = async () => {
    try {
      const response = await fetch('http://localhost:8080/tipos_habitacion');
      if (!response.ok) throw new Error('Error al cargar los tipos de habitación');
      const data = await response.json();
      setRoomTypes(data.reduce((map, roomType) => {
        map[roomType.id_tipo] = roomType.imagenUrl || defaultRoomImage; 
        return map;
      }, {}));
    } catch (error) {
      setError('Error al cargar los tipos de habitación: ' + error.message);
    }
  };
  



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
      const hotelsResponse = await fetch(url);
      if (!hotelsResponse.ok) throw new Error('Error al cargar hoteles');
      const hotelsData = await hotelsResponse.json();
  
      const roomTypesResponse = await fetch('http://localhost:8080/tipos_habitacion');
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
      setError('Error al cargar hoteles y habitaciones: ' + error.message);
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
  
            <Form.Group controlId="capacidadPersonas">
              <Form.Label>Capacidad de Personas en Habitación</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ingrese la capacidad de personas" 
                value={filterCapacity} 
                onChange={(e) => setFilterCapacity(e.target.value)}
              />
            </Form.Group>
  
            <Button variant="primary" type="submit">Buscar Hoteles</Button>
            <Button variant="secondary" type="button" onClick={handleFilterRooms} className="ml-2">
              Filtrar Habitaciones
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
      {hotels.length > 0 ? (
  hotels.map((hotel) => (
    <React.Fragment key={hotel.id_hotel}>
      <Col md={10} className="mt-4">
        <h3>Hotel: {hotel.nombre}</h3>
        <p>{hotel.ciudad}, {hotel.pais}</p>
        <p>Dirección: {hotel.direccion}</p>
        {hotelImages[hotel.id_hotel] && hotelImages[hotel.id_hotel].length > 0 && (
          <Carousel interval={null}>
            {hotelImages[hotel.id_hotel].map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Imagen ${index + 1} del hotel ${hotel.nombre}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}

      </Col>
              {hotel.rooms && hotel.rooms.map((room) => (
                <Col key={room.id_habitacion} md={6}>
                  <Card className="mb-3">
                  <Card.Img variant="top" src={room.imagenUrl || defaultRoomImage} />
                    <Card.Body>
                    <Card.Title>Habitación: {tiposHabitacion[room.tipo_habitacion]}</Card.Title>
                      <Card.Text>Número de habitación: {room.numero_habitacion}</Card.Text>
                      <Card.Text>Capacidad máxima: {room.capacidad_personas} personas</Card.Text>
                      <Card.Text>Precio por noche: ${room.precioxnoche}</Card.Text>
                      <Card.Text>Valoración: {room.valuacion} estrellas</Card.Text>
                      {room.estado === 'activo' && (
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
                  )}


                    <Comentarios idHabitacion={room.id_habitacion} />


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

export default HotelDetailsPage;