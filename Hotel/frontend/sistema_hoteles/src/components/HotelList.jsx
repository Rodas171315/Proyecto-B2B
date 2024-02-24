import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';

const HotelList = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        // Leer los hoteles de localStorage al cargar el componente
        const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
        setHotels(storedHotels);
    }, []);

    return (
        <Container>
            {hotels.map((hotel, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        <Card.Title>{hotel.name}</Card.Title>
                        <Card.Text>{hotel.description}</Card.Text>
                        <ListGroup variant="flush">
                            {hotel.rooms.map((room, idx) => (
                                <ListGroup.Item key={idx}>
                                    {room.type} - ${room.price} por noche
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default HotelList;
