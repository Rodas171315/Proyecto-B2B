import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Alert, Row, Col } from 'react-bootstrap';

const AddHabitacionPage = () => {
  const [hoteles, setHoteles] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [nuevaHabitacion, setNuevaHabitacion] = useState({
    numero_habitacion: '',
    capacidad_personas: '',
    tipo_habitacion: '',
    precioxpersona: '',
    precioxnoche: '',
    valuacion: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchHoteles();
  }, []);

  const fetchHoteles = async () => {
    try {
      const response = await fetch('http://localhost:8080/hoteles');
      if (!response.ok) throw new Error('Error al cargar los hoteles');
      const data = await response.json();
      setHoteles(data);
    } catch (error) {
      console.error('Error al cargar los hoteles:', error);
      setErrorMessage('Error al cargar los hoteles');
    }
  };

  const fetchHabitaciones = async (idHotel) => {
    try {
      const url = idHotel ? `http://localhost:8080/habitaciones?hotelId=${idHotel}` : 'http://localhost:8080/habitaciones';
      const response = await fetch(url);
      if (!response.ok) throw new Error('No se pudieron cargar las habitaciones');
      const data = await response.json();
      setHabitaciones(data);
    } catch (error) {
      console.error('Error al cargar las habitaciones:', error);
      setErrorMessage('Error al cargar las habitaciones');
      // Si hay un error al cargar las habitaciones, asegúrate de limpiar el estado
      setHabitaciones([]);
    }
  };
  

  const handleSelectHotel = (e) => {
    const hotelId = e.target.value;
    setSelectedHotel(hotelId);
    if (hotelId) {
      fetchHabitaciones(hotelId);
    } else {
      // Si no hay un hotel seleccionado, limpiam las habitaciones mostradas
      setHabitaciones([]);
    }
  };

  const handleChangeNuevaHabitacion = (e) => {
    const { name, value } = e.target;
    setNuevaHabitacion(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitHabitacion = async (e) => {
    e.preventDefault();
    try {
        const habitacionData = { 
            ...nuevaHabitacion, 
            id_hotel: selectedHotel // Cambio importante aquí: asegurarse de que el nombre del campo coincida con el backend
        };
        const response = await fetch('http://localhost:8080/habitaciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(habitacionData),
        });
        if (!response.ok) throw new Error('Error al crear la habitación');
        setSuccessMessage('Habitación creada exitosamente');
        fetchHabitaciones(selectedHotel); // Recargar las habitaciones del hotel seleccionado
        // Resetear formulario de nueva habitación
        setNuevaHabitacion({
            numero_habitacion: '',
            capacidad_personas: '',
            tipo_habitacion: '',
            precioxpersona: '',
            precioxnoche: '',
            valuacion: '',
        });
    } catch (error) {
        console.error('Error al crear la habitación:', error);
        setErrorMessage('Error al crear la habitación');
    }
};



  return (
    <Container>
      <h1>Añadir Habitación a Hotel</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form>
        <Form.Group controlId="selectHotel">
          <Form.Label>Selecciona un Hotel</Form.Label>
          <Form.Control as="select" onChange={handleSelectHotel} value={selectedHotel}>
            <option value="">Selecciona un hotel</option>
            {hoteles.map((hotel) => (
              <option key={hotel.id_hotel} value={hotel.id_hotel}>
                {hotel.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>

      {selectedHotel && (
        <>
          <h2 className="mt-4">Añadir nueva habitación al hotel seleccionado</h2>
<Form onSubmit={handleSubmitHabitacion}>
<Row className="mb-3">
<Col>
<Form.Group controlId="formNumeroHabitacion">
<Form.Label>Número de Habitación</Form.Label>
<Form.Control
type="text"
placeholder="Número de habitación"
name="numero_habitacion"
value={nuevaHabitacion.numero_habitacion}
onChange={handleChangeNuevaHabitacion}
/>
</Form.Group>
</Col>
<Col>
<Form.Group controlId="formCapacidadPersonas">
<Form.Label>Capacidad de Personas</Form.Label>
<Form.Control
type="number"
placeholder="Capacidad máxima de personas"
name="capacidad_personas"
value={nuevaHabitacion.capacidad_personas}
onChange={handleChangeNuevaHabitacion}
/>
</Form.Group>
</Col>
</Row>
<Row className="mb-3">
<Col>
<Form.Group controlId="formTipoHabitacion">
<Form.Label>Tipo de Habitación</Form.Label>
<Form.Control
as="select"
name="tipo_habitacion"
value={nuevaHabitacion.tipo_habitacion}
onChange={handleChangeNuevaHabitacion}
>
<option value="">Seleccione el tipo de habitación</option>
{/* Suponiendo que estos valores están disponibles. Deben ser reemplazados por la lista real obtenida desde el backend */}
<option value="1">Doble</option>
<option value="2">Junior suite</option>
<option value="3">Suite</option>
<option value="4">Gran suite</option>
</Form.Control>
</Form.Group>
</Col>
<Col>
<Form.Group controlId="formPrecioXPersona">
<Form.Label>Precio por Persona</Form.Label>
<Form.Control
type="number"
placeholder="Precio por persona"
name="precioxpersona"
value={nuevaHabitacion.precioxpersona}
onChange={handleChangeNuevaHabitacion}
/>
</Form.Group>
</Col>
</Row>
<Row>
<Col>
<Form.Group controlId="formPrecioXNoche">
<Form.Label>Precio por Noche</Form.Label>
<Form.Control
type="number"
placeholder="Precio por noche"
name="precioxnoche"
value={nuevaHabitacion.precioxnoche}
onChange={handleChangeNuevaHabitacion}
/>
</Form.Group>
</Col>
<Col>
<Form.Group controlId="formValuacion">
<Form.Label>Valoración</Form.Label>
<Form.Control
type="number"
placeholder="Valoración de la habitación"
name="valuacion"
value={nuevaHabitacion.valuacion}
onChange={handleChangeNuevaHabitacion}
/>
</Form.Group>
</Col>
</Row>
<Button variant="primary" type="submit">Añadir Habitación</Button>
</Form>
<h2 className="mt-4">Habitaciones existentes en el hotel seleccionado</h2>
      {habitaciones.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Número de Habitación</th>
              <th>Capacidad de Personas</th>
              <th>Tipo de Habitación</th>
              <th>Precio por Persona</th>
              <th>Precio por Noche</th>
              <th>Valoración</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map((habitacion) => (
              <tr key={habitacion.id_habitacion}>
                <td>{habitacion.numero_habitacion}</td>
                <td>{habitacion.capacidad_personas}</td>
                <td>{habitacion.tipo_habitacion}</td>
                <td>${habitacion.precioxpersona}</td>
                <td>${habitacion.precioxnoche}</td>
                <td>{habitacion.valuacion} estrellas</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">No hay habitaciones disponibles para este hotel. Puedes añadir nuevas.</Alert>
      )}
    </>
  )}
</Container>
);
};

export default AddHabitacionPage;

