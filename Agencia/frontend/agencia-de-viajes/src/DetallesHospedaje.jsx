import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Comentarios from './Comentarios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const DetallesHospedaje = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [habitaciones, setHabitaciones] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        const fetchHabitaciones = async () => {
            try {
                const response = await fetch(`http://localhost:8080/hoteles/${id}/habitaciones`);
                if (!response.ok) {
                    throw new Error('No se pudo cargar las habitaciones');
                }
                const data = await response.json();
                setHabitaciones(data);
            } catch (error) {
                console.error('Error al cargar las habitaciones:', error);
            }
        };

        fetchHabitaciones();
    }, [id]);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Agencia de Viajes
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/')}>Inicio</Button>
                    <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                    <Button color="inherit" onClick={() => navigate('/register')}>Registrarse</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ mt: 4 }}>
            {habitaciones.length > 0 ? (
                    habitaciones.map((habitacion, index) => (
                        <Card key={index} sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h5">{habitacion.tipo}</Typography>
                                <Typography>{habitacion.descripcion}</Typography>
                                <Typography>{`Precio: ${habitacion.precio} USD por noche`}</Typography>
                                <Slider {...settings}>
                                    {habitacion.imagenes.map((imagen, idx) => (
                                        <div key={idx}>
                                            <img src={imagen} alt="Habitación" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                                        </div>
                                    ))}
                                </Slider>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography>No hay habitaciones disponibles para mostrar.</Typography>
                )}
            </Container>
            <Box mt={4}>
                <Comentarios />
            </Box>
        </div>
    );
};

export default DetallesHospedaje;


