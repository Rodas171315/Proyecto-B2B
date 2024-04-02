import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Card, CardContent, Box } from '@mui/material';

import Comentarios from './Comentarios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Header from './Header'; 
import Footer from './Footer';


const DetallesHospedaje = () => {
    const { id } = useParams();
    
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
                const response = await fetch(`http://localhost:8081/hoteles/${id}/habitaciones`);
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
            <Header />
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
            <Footer />
        </div>
    );
};

export default DetallesHospedaje;


