import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col, Table } from 'react-bootstrap';

const AddHotelPage = () => {
  const [hotelData, setHotelData] = useState({
    id_cadena: 100,
    nombre: '',
    pais: '',
    ciudad: '',
    direccion: '',
    checkin: '15:00:00',
    checkout: '11:00:00',
    imageLink: '', 
  });

  const [hoteles, setHoteles] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [hotelEditado, setHotelEditado] = useState({});
  const [hotelImages, setHotelImages] = useState({});
  const [estadoHotel, setEstadoHotel] = useState('');

  const fetchHoteles = async () => {
    try {
      const response = await fetch('http://localhost:8080/hoteles');
      if (!response.ok) throw new Error('No se pudieron cargar los hoteles');
      const data = await response.json();
      setHoteles(data);
    } catch (error) {
      setErrorMessage('Error al cargar hoteles: ' + error.message);
    }
  };


  useEffect(() => {
    fetchHoteles();
  }, []);
  

  


  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({ ...prev, [name]: value }));
  };

  const submitHotel = async () => {
    try {
      const response = await fetch('http://localhost:8080/hoteles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotelData),
      });
      if (!response.ok) throw new Error('Error al crear hotel');
      setSuccessMessage('Hotel creado exitosamente');
      fetchHoteles();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };


  
  const iniciarEdicion = (hotel) => {
    setEditandoId(hotel.id_hotel);
    // con esot `hotelImages[hotel.id_hotel]` proporciona siempre un arreglo con al menos 5 elementos.
    const initialImageLinks = [...(hotelImages[hotel.id_hotel] || []), ...Array(5)].slice(0, 5).map(link => link || '');
    setHotelEditado({ ...hotel, imageLinks: initialImageLinks });
  };
  



  const handleImageLinkChange = (index, value) => {
    let updatedLinks = [...hotelEditado.imageLinks];
    updatedLinks[index] = value;
    setHotelEditado({ ...hotelEditado, imageLinks: updatedLinks });
  };



  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setHotelEditado(prev => ({ ...prev, [name]: value }));
  };

  const guardarEdicion = async () => {
    try {
      const response = await fetch(`http://localhost:8080/hoteles/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotelEditado),
      });

      if (!response.ok) throw new Error('Error al editar hotel');

      
          //  manejas la lógica de las imágenes.
    await manejarImagenesDelHotel(editandoId, hotelEditado.imageLinks);

    setEditandoId(null);
    setSuccessMessage('Hotel editado exitosamente');
    fetchHoteles();
  } catch (error) {
    setErrorMessage(error.message);
  }
};

const manejarImagenesDelHotel = async (hotelId, imageLinks) => {
  // Filtra los enlaces vacíos para no enviarlos
  const urlImagenes = imageLinks.filter(url => url);

  try {
    const response = await fetch(`http://localhost:8080/hoteles/${hotelId}/imagenes`, {
      method: 'POST', //  POST para actualizar todas las imágenes a la vez
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(urlImagenes) // Envía un arreglo de URLs
    });

    if (!response.ok) {
      // Maneja la respuesta no exitosa
      throw new Error("Error al actualizar las imágenes del hotel.");
    }
  } catch (error) {
    console.error("Error al manejar las imágenes del hotel", error);
  }
};





  const eliminarHotel = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/hoteles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar hotel');
      setSuccessMessage('Hotel eliminado exitosamente');
      fetchHoteles();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };




const fetchHotelImages = async () => {
  let newHotelImages = {};
  for (let hotel of hoteles) {
    const response = await fetch(`http://localhost:8080/hoteles/${hotel.id_hotel}/imagenes`);
    if (response.ok) {
      const images = await response.json();
      newHotelImages[hotel.id_hotel] = images;
    } else {
      newHotelImages[hotel.id_hotel] = []; // Asegura un arreglo vacío si no hay imágenesf
    }
  }
  setHotelImages(newHotelImages);
};

useEffect(() => {
  if (hoteles.length > 0) {
    fetchHotelImages();
  }
}, [hoteles]);



// MANEJO DEL ESTADO


const cambiarEstadoHotel = async (idHotel, estadoActual) => {
  const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';
  
  try {
    const response = await fetch(`http://localhost:8080/hoteles/${idHotel}/estado/${nuevoEstado}`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Error al cambiar el estado del hotel');
    }
    // Actualiza la UI inmediatamente después del cambio de estado exitoso
    const hotelesActualizados = hoteles.map(hotel => {
      if (hotel.id_hotel === idHotel) {
        return { ...hotel, estado: nuevoEstado }; // Actualiza el estado del hotel específico
      }
      return hotel;
    });
    setHoteles(hotelesActualizados);
    setSuccessMessage(`Hotel ${nuevoEstado} exitosamente`);
  } catch (error) {
    console.error(error);
    setErrorMessage('Error al cambiar el estado: ' + error.message);
  }
};






  return (
    <Container>
      <h1>Agregar Nuevo Hotel</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formHotelNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del hotel"
                name="nombre"
                value={hotelData.nombre}
                onChange={handleHotelChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formHotelPais">
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                placeholder="País"
                name="pais"
                value={hotelData.pais}
                onChange={handleHotelChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formHotelCiudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ciudad"
                name="ciudad"
                value={hotelData.ciudad}
                onChange={handleHotelChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formHotelDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dirección"
                name="direccion"
                value={hotelData.direccion}
                onChange={handleHotelChange}
              />
            </Form.Group>
          
          </Col>
        </Row>
        <Button variant="primary" onClick={submitHotel}>Crear Hotel</Button>
      </Form>


      
      <h2 className="mt-5">Hoteles Disponibles</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>País</th>
            <th>Ciudad</th>
            <th>Dirección</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hoteles.map((hotel) => (
            <tr key={hotel.id_hotel}>
              {editandoId === hotel.id_hotel ? (
                <>
                
                  <td>{hotel.id_hotel}</td>
                  <td><Form.Control type="text" name="nombre" value={hotelEditado.nombre} onChange={handleEditChange} /></td>
                  <td><Form.Control type="text" name="pais" value={hotelEditado.pais} onChange={handleEditChange} /></td>
                  <td><Form.Control type="text" name="ciudad" value={hotelEditado.ciudad} onChange={handleEditChange} /></td>
                  <td><Form.Control type="text" name="direccion" value={hotelEditado.direccion} onChange={handleEditChange} /></td>
                  <td>
        {editandoId === hotel.id_hotel ? (
          hotelEditado.imageLinks.map((link, index) => (
            <Form.Control
              key={index}
              type="text"
              placeholder={`Link de la imagen ${index + 1}`}
              value={link}
              onChange={(e) => handleImageLinkChange(index, e.target.value)}
              style={{marginBottom: "5px"}}
            />
          ))
        ) : (
          hotelImages[hotel.id_hotel]?.length ? hotelImages[hotel.id_hotel].map((link, index) => <div key={index}>{link}</div>) : <div>Sin Imagen</div>
        )}
      </td>
                  <td>
                    <Button variant="success" onClick={guardarEdicion}>Guardar</Button>
                    <Button variant="danger" onClick={() => setEditandoId(null)} style={{marginLeft: '5px'}}>Cancelar</Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{hotel.id_hotel}</td>
                  <td>{hotel.nombre}</td>
                  <td>{hotel.pais}</td>
                  <td>{hotel.ciudad}</td>
                  <td>{hotel.direccion}</td>
                  <td>
              {editandoId === hotel.id_hotel ? (
                <>
                  {hotelEditado[editandoId]?.imageLinks.map((link, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      placeholder={`Link de la imagen ${index + 1}`}
                      value={link}
                      onChange={(e) => handleImageLinkChange(editandoId, index, e.target.value)}
                      style={{ marginBottom: '5px' }}
                    />
                  ))}
                </>
              ) : (
                <>
                  {hotelImages[hotel.id_hotel]?.map((link, index) => (
                    <div key={index}>{link || 'Sin Imagen'}</div>
                  ))}
                </>
              )}
            </td>
                  <td>
                    <Button variant="secondary" onClick={() => iniciarEdicion(hotel)}>Editar</Button>
                    <Button variant={hotel.estado === 'warning' ? 'danger' : 'success'} onClick={() => cambiarEstadoHotel(hotel.id_hotel, hotel.estado)}>
        {hotel.estado === 'activo' ? 'Desactivar' : 'Activar'}
      </Button>
                    <Button variant="danger" onClick={() => eliminarHotel(hotel.id_hotel)} style={{marginLeft: '5px'}}>Eliminar</Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Mensajes de éxito o error, si existen */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Container>
  );
};

export default AddHotelPage;