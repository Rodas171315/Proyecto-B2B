import React, { useState, useEffect } from 'react';
import { Typography, Button, Container, Grid, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 

const HospedajesDisponibles = () => {
    const [hotelesConHabitaciones, setHotelesConHabitaciones] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { paisSeleccionado } = location.state ? location.state : { paisSeleccionado: '' };
        if (paisSeleccionado) {
            console.log(`Buscando hoteles para el país: ${paisSeleccionado}`);
            fetchHotelsAndRooms(paisSeleccionado);
        } else {
            console.error("No se proporcionó un país para la búsqueda");
        }
    }, [location.state]);

    const fetchHotelsAndRooms = async (pais) => {
        try {
            const responseHoteles = await fetch(`http://localhost:8080/hoteles/por-pais/${pais}`);
            if (!responseHoteles.ok) throw new Error('Error al cargar hoteles');
            const hoteles = await responseHoteles.json();

            const hotelesConHabitacionesPromesas = hoteles.map(async (hotel) => {
                const respuestaHabitaciones = await fetch(`http://localhost:8080/habitaciones?hotelId=${hotel.id_hotel}`);
                if (!respuestaHabitaciones.ok) {
                    console.error(`Error al cargar habitaciones para el hotel: ${hotel.nombre}`);
                    return { ...hotel, habitaciones: [] };
                }
                const habitaciones = await respuestaHabitaciones.json();
                console.log(`Habitaciones cargadas para ${hotel.nombre}:`, habitaciones); 
                return { ...hotel, habitaciones };
            });

            const hotelesConHabitaciones = await Promise.all(hotelesConHabitacionesPromesas);
            console.log("Hoteles con habitaciones:", hotelesConHabitaciones); 
            setHotelesConHabitaciones(hotelesConHabitaciones);
        } catch (error) {
            console.error('Error al cargar hoteles y habitaciones:', error);
        }
    };

    const iniciarCompra = (hotel, habitacion) => {
        console.log("Datos de la habitación:", habitacion);
        navigate('/comprahospedaje', { state: { hotelDetails: hotel, roomDetails: habitacion } });
    };

    return (
        <div>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Hoteles y Habitaciones Disponibles
                </Typography>
                <Grid container spacing={4}>
                    {hotelesConHabitaciones.map((hotel) =>
                        hotel.habitaciones.map((habitacion, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card>
                                   
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://source.unsplash.com/random?hotelRoom&sig=${index}`}
                                        alt={`Habitación ${habitacion.numero_habitacion}`}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {hotel.nombre} - Habitación {habitacion.numero_habitacion}
                                        </Typography>
                                        <Typography>Capacidad: {habitacion.capacidad_personas} personas</Typography>
                                        <Typography>Precio por noche: ${habitacion.precioxnoche}</Typography>
                                        <Typography>Valoración: {habitacion.valuacion} estrellas</Typography>
                                    </CardContent>
                                    <CardActions>
                                    <Button size="small" onClick={() => iniciarCompra(hotel, habitacion)}>
                                        Comprar
                                    </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default HospedajesDisponibles;




