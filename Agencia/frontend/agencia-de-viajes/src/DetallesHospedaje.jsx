import React from 'react';
import { useParams } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Comentarios from './Comentarios';
import Slider from 'react-slick'; // Importa Slider de react-slick

const DetallesHospedaje = () => {
    const { id } = useParams(); // Obtiene el ID del URL
    const navigate = useNavigate();

    // Configuraciones para el carrusel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // Aquí buscarías la información del hospedaje basado en el ID
    // Los datos abajo son solo para ejemplo
    const hospedaje = {
        id,
        nombre: "Hotel Ejemplo",
        descripcion: "Descripción detallada del hotel.",
        habitaciones: [
            { tipo: "Individual", descripcion: "Una cama. Perfecta para viajeros solos.", precio: "80 USD por noche" },
            { tipo: "Doble", descripcion: "Dos camas. Ideal para parejas o amigos.", precio: "120 USD por noche" },
        ],
    };

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
                <Typography variant="h4" component="h2" gutterBottom>
                    Detalles del Hospedaje
                </Typography>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">{hospedaje.nombre}</Typography>
                        <Typography>{hospedaje.descripcion}</Typography>
                        {/* Imagen aleatoria del hotel */}
                        <CardMedia
                            component="img"
                            height="200"
                            image={`https://source.unsplash.com/random?hotel&${id}`}
                            alt="Imagen del hotel"
                        />
                        {/* Iterar sobre las habitaciones disponibles */}
                        {hospedaje.habitaciones.map((habitacion, index) => (
                            <Box key={index} mt={2}>
                                <Typography variant="h6">{habitacion.tipo}</Typography>
                                <Typography>{habitacion.descripcion}</Typography>
                                <Typography>{habitacion.precio}</Typography>
                                {/* Carrusel de imágenes para cada habitación */}
                                <Slider {...settings}>
                                    <div>
                                    <img src={`https://source.unsplash.com/random?hotel-room&sig=${index}1`} alt="Habitación" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                                    </div>
                                </Slider>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Container>
            <Box mt={4}>
                <Comentarios />
            </Box>
        </div>
    );
};

export default DetallesHospedaje;

