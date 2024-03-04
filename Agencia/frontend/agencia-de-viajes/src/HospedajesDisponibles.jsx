import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const hospedajes = [
    { id: 1, nombre: "Hotel Sunset", descripcion: "Cerca de la playa, con vista al mar.", precio: "150 USD por noche" },
    { id: 2, nombre: "Montaña Mágica", descripcion: "Rodeado de naturaleza y tranquilidad.", precio: "100 USD por noche" },
    // Agrega más hospedajes aquí
];

const HospedajesDisponibles = () => {
    const navigate = useNavigate();

    const verDetalles = (id) => {
        navigate(`/hospedajes/${id}`); // Navegar a la ruta de detalles del hospedaje
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
                    Hospedajes Disponibles
                </Typography>
                <Grid container spacing={4}>
                    {hospedajes.map((hospedaje, index) => (
                        <Grid item key={hospedaje.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://source.unsplash.com/random?hotel&sig=${index}`}
                                    alt="Imagen del hotel"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">{hospedaje.nombre}</Typography>
                                    <Typography>{hospedaje.descripcion}</Typography>
                                    <Typography>{hospedaje.precio}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => verDetalles(hospedaje.id)}>Ver Detalles</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default HospedajesDisponibles;
