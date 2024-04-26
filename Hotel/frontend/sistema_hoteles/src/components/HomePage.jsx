import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Image, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import defaultRoomImage from './roomImage.jpg';
import Comentarios from './Comentarios';
import { useUser } from './UserContext';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [paises, setPaises] = useState([]);
  const [capacidades, setCapacidades] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [numeroPersonas, setNumeroPersonas] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [hotelImages, setHotelImages] = useState({});
  const [roomTypes, setRoomTypes] = useState({});
  const { user } = useUser();  


// PAL SEGUNDO FILTRO:

const [selectedRoomType, setSelectedRoomType] = useState('');
const [selectedRating, setSelectedRating] = useState('0'); 
const [showFilters, setShowFilters] = useState(false);
const [orderByPrice, setOrderByPrice] = useState('');


const applyAdditionalFilters = () => {
  let filteredHotels = [...hotels]; // Copia del estado actual

  if (orderByPrice === 'asc') {
    filteredHotels.forEach(hotel => {
      hotel.rooms.sort((a, b) => a.precioxnoche - b.precioxnoche);
    });
  } else if (orderByPrice === 'desc') {
    filteredHotels.forEach(hotel => {
      hotel.rooms.sort((a, b) => b.precioxnoche - a.precioxnoche);
    });
  }

  if (selectedRoomType) {
    filteredHotels = filteredHotels.map(hotel => ({
      ...hotel,
      rooms: hotel.rooms.filter(room => room.tipo_habitacion.toString() === selectedRoomType)
    }));
  }

  if (selectedRating > 0) {
    filteredHotels.forEach(hotel => {
      hotel.rooms = hotel.rooms.filter(room => room.valuacion >= selectedRating);
    });
  }

  setHotels(filteredHotels);
};


// FIN SEGUNDO FILTRO

  const tiposHabitacion = {
    1: 'Doble',
    2: 'Junior Suite',
    3: 'Suite',
    4: 'Gran Suite'
  };


  useEffect(() => {
    fetchRoomTypes();
    fetchPaises();
    fetchCapacidades();
    fetchInitialHotelsAndRooms();
  }, []);




  const fetchCapacidades = async () => {
    try {
      const response = await fetch('http://localhost:8080/habitaciones/capacidades');
      if (!response.ok) throw new Error('No se pudieron cargar las capacidades de las habitaciones');
      const capacidadesUnicas = await response.json();
      setCapacidades(capacidadesUnicas.sort((a, b) => a - b));
    } catch (error) {
      console.error('Error al cargar capacidades:', error);
      setError('Error al cargar las capacidades de las habitaciones.');
    }
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

  const fetchInitialHotelsAndRooms = async () => {
    try {
      const hotelsResponse = await fetch('http://localhost:8080/hoteles');
      if (!hotelsResponse.ok) throw new Error('Error al cargar hoteles');
      const hotelsData = await hotelsResponse.json();
  
      const roomTypesResponse = await fetch('http://localhost:8080/tipos_habitacion');
      if (!roomTypesResponse.ok) throw new Error('Error al cargar tipos de habitación');
      const roomTypesData = await roomTypesResponse.json();
  
      const roomTypesMap = roomTypesData.reduce((acc, roomType) => {
        acc[roomType.id_tipo] = roomType.imagenUrl || defaultRoomImage;
        return acc;
      }, {});
  
      const hotelsWithRooms = await Promise.all(hotelsData.map(async (hotel) => {
        const roomsResponse = await fetch(`http://localhost:8080/habitaciones?hotelId=${hotel.id_hotel}`); 
        if (!roomsResponse.ok) {
          console.error('Error fetching rooms for hotel', hotel.id_hotel); 
          return { ...hotel, rooms: [] }; // Devuelve el hotel sin modificarlo si hay un error
        }
        const roomsData = await roomsResponse.json();
        const roomsWithImages = roomsData.map(room => ({
          ...room,
          imagenUrl: roomTypesMap[room.tipo_habitacion] || defaultRoomImage
        }));
        return { ...hotel, rooms: roomsWithImages };
      }));
  
      setHotels(hotelsWithRooms);
    } catch (error) {
      console.error('Error loading initial hotels and rooms:', error);
      setError('Error al cargar hoteles y habitaciones iniciales: ' + error.message);
    }
  };
  
  
  

  const fetchHotelsAndRoomsFiltered = async () => {
    let queryParams = `?pais=${paisSeleccionado}&fechaIngreso=${fechaIngreso}&fechaSalida=${fechaSalida}&numeroPersonas=${numeroPersonas}`;
    if (user && user.id) {
        queryParams += `&usuarioId=${user.id}`;  // Agrega el ID del usuario a los parámetros de la consulta
    }

    try {
        const response = await fetch(`http://localhost:8080/habitaciones/buscar${queryParams}`);
        if (!response.ok) throw new Error('Error al cargar hoteles y habitaciones filtradas');
        const filteredRooms = await response.json();
  
  
      // trasn las habitaciones filtradas en una estructura de hoteles con habitaciones
      const hotelsMap = {};
      for (const room of filteredRooms) {
        if (!hotelsMap[room.id_hotel]) {
          // Si el hotel no está en el mapa, regresa y basicmente lo busca en los hoteles cargados inicialmente
          const hotelData = hotels.find(hotel => hotel.id_hotel === room.id_hotel);
          hotelsMap[room.id_hotel] = {
            ...hotelData,
            rooms: []
          };
        }
        hotelsMap[room.id_hotel].rooms.push({
          ...room,
          imagenUrl: roomTypes[room.tipo_habitacion] || defaultRoomImage
        });
      }
  
      setHotels(Object.values(hotelsMap));
    } catch (error) {
      setError('Error al cargar hoteles y habitaciones filtradas: ' + error.message);
    }
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHotelsAndRoomsFiltered();
    setShowFilters(true);

  };

  return (
    <Container className="my-5">
      {/* Filtro de búsqueda */}
      <Form onSubmit={handleSearch}>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="pais">
              <Form.Label>País</Form.Label>
              <Form.Control as="select" value={paisSeleccionado} onChange={e => setPaisSeleccionado(e.target.value)}>
                <option value="">Seleccione un país</option>
                {paises.map(pais => (
                  <option key={pais} value={pais}>{pais}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fechaIngreso">
              <Form.Label>Fecha de Ingreso</Form.Label>
              <Form.Control type="date" value={fechaIngreso} onChange={e => setFechaIngreso(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fechaSalida">
              <Form.Label>Fecha de Salida</Form.Label>
              <Form.Control type="date" value={fechaSalida} onChange={e => setFechaSalida(e.target.value)} />
            </Form.Group>
          </Col>
         <Col>
            <Form.Group controlId="capacidadPersonas">
              <Form.Label>Capacidad de Personas</Form.Label>
              <Form.Control as="select" value={numeroPersonas} onChange={e => setNumeroPersonas(e.target.value)}>
                <option value="">Seleccione capacidad</option>
                {capacidades.map((capacidad, index) => (
                  <option key={index} value={capacidad}>{capacidad} personas</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit">Buscar</Button>
          </Col>
        </Row>
      </Form>



      {showFilters && (
        <>
          <Row className="mb-4">
            <Col>
            <Form.Label>Ordenar Precio</Form.Label>
            <Form.Control as="select" value={orderByPrice} onChange={e => setOrderByPrice(e.target.value)}>
              <option value="">Seleccione orden</option>
              <option value="asc">Menor a Mayor</option>
              <option value="desc">Mayor a Menor</option>
            </Form.Control>
            </Col>
            <Col>
              <Form.Group controlId="roomType">
                <Form.Label>Tipo de Habitación</Form.Label>
                <Form.Control as="select" value={selectedRoomType} onChange={e => setSelectedRoomType(e.target.value)}>
                  <option value="">Todos los tipos</option>
                  {Object.entries(tiposHabitacion).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              </Col>
          <Col>
            <Form.Label>Rating mínimo</Form.Label>
            <Form.Control as="select" value={selectedRating} onChange={e => setSelectedRating(e.target.value)}>
              <option value="0">Todos los ratings</option>
              {[1, 2, 3, 4, 5].map(rating => (
                <option key={rating} value={rating}>{rating}</option>
              ))}
            </Form.Control>
          </Col>
          <Col>
              <Button variant="primary" onClick={applyAdditionalFilters}>Aplicar Filtros Adicionales</Button>
            </Col>
          </Row>
        </>
      )}
      <Row>
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <React.Fragment key={`${hotel.id_hotel}-${index}`}>





      <Col md={10} className="mt-4">
        <h3>Hotel: {hotel.nombre}</h3>
        <p>{hotel.ciudad}, {hotel.pais}</p>
        <p>Dirección: {hotel.direccion}</p>
        {hotelImages[hotel.id_hotel] && hotelImages[hotel.id_hotel].length > 0 && (
          <Carousel interval={null}>
            {hotelImages[hotel.id_hotel].map((image, imageIndex) => (
              // AQUI YA SE PUEDE usar el índice porque está dentro de un contexto que ya es único (el hotel específico)
              <Carousel.Item key={imageIndex}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Imagen ${imageIndex + 1} del hotel ${hotel.nombre}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Col>



      {hotel.rooms && hotel.rooms.map((room, roomIndex) => (
        // ACA, SE combina id de habitación con un índice para las claves de las habitaciones
        <Col key={`${room.id_habitacion}-${roomIndex}`} md={6}>
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

export default HomePage;