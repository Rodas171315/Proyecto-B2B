import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, CloseButton } from 'react-bootstrap';

const AddHotelPage = () => {
    const [hotel, setHotel] = useState({
        name: '',
        address: '',
        description: '',
        rooms: [{ type: '', price: '', maxGuests: '' }],
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotel({ ...hotel, [name]: value });
    };

    const handleRoomChange = (index, event) => {
        const updatedRooms = [...hotel.rooms];
        updatedRooms[index][event.target.name] = event.target.value;
        setHotel({ ...hotel, rooms: updatedRooms });
    };

    const addRoom = () => {
        setHotel({
            ...hotel,
            rooms: [...hotel.rooms, { type: '', price: '', maxGuests: '' }],
        });
    };

    const removeRoom = (index) => {
        const updatedRooms = [...hotel.rooms];
        updatedRooms.splice(index, 1);
        setHotel({ ...hotel, rooms: updatedRooms });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Obtener la lista actual de hoteles
        const existingHotels = JSON.parse(localStorage.getItem('hotels')) || [];
        // Agregar el nuevo hotel
        const updatedHotels = [...existingHotels, hotel];
        localStorage.setItem('hotels', JSON.stringify(updatedHotels));
        setShowSuccess(true);
        // Resetear el formulario o redirigir al usuario
    };
    

    return (
        <Container>
            <h2>Agregar Nuevo Hotel</h2>
            {showSuccess && <Alert variant="success">Hotel agregado con éxito.</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre del Hotel</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" name="name" value={hotel.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder="Dirección" name="address" value={hotel.address} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Descripción del hotel" name="description" value={hotel.description} onChange={handleChange} required />
                </Form.Group>

                {hotel.rooms.map((room, index) => (
                    <Card className="mb-3" key={index}>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Habitación</Form.Label>
                                <Form.Control type="text" placeholder="Ej. Doble, Suite" name="type" value={room.type} onChange={e => handleRoomChange(index, e)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Precio por Noche</Form.Label>
                                <Form.Control type="number" placeholder="Precio" name="price" value={room.price} onChange={e => handleRoomChange(index, e)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Máximo de Huéspedes</Form.Label>
                                <Form.Control type="number" placeholder="Máximo de huéspedes" name="maxGuests" value={room.maxGuests} onChange={e => handleRoomChange(index, e)} required />
                            </Form.Group>
                            <CloseButton onClick={() => removeRoom(index)} />
                        </Card.Body>
                    </Card>
                ))}
                <Button variant="secondary" onClick={addRoom} className="mb-3">Añadir Habitación</Button>

                <Button variant="primary" type="submit">
                    Agregar Hotel
                </Button>
            </Form>
        </Container>
    );
};

export default AddHotelPage;
