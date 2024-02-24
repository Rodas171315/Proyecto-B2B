import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import SearchForm from './SearchForm';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

const HomePage = () => {
    const navigate = useNavigate();
    const popularDestinations = [
        { name: "París", description: "La ciudad del amor y la luz", imageUrl: "https://source.unsplash.com/random?paris" },
        { name: "Bali", description: "La isla de los dioses", imageUrl: "https://source.unsplash.com/random?bali" },
        { name: "Nueva York", description: "La ciudad que nunca duerme", imageUrl: "https://source.unsplash.com/random?newyork" },
    ];
    
    const specialOffers = [
        { name: "Aventura en Costa Rica", description: "Descuento especial de temporada", imageUrl: "https://source.unsplash.com/random?costarica" },
        { name: "Tour por Italia", description: "Paquete todo incluido a un precio increíble", imageUrl: "https://source.unsplash.com/random?italy" },
        { name: "Descubrimiento de Japón", description: "Explora la tierra del sol naciente", imageUrl: "https://source.unsplash.com/random?japan" },
    ];
    

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Agencia de Viajes
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                    <Button color="inherit" onClick={() => navigate('/register')}>Registrarse</Button>
                    <Button color="inherit" onClick={() => navigate('/aboutus')}>Acerca de Nosotros</Button>
                    <Button color="inherit" onClick={() => navigate('/userprofile')}>Perfil</Button>
                </Toolbar>
            </AppBar>
            
            <Box mt={4}> 
                <SearchForm />
            </Box>
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                {/* Destinos Populares */}
                <Typography variant="h4" component="h2" gutterBottom>
                    Destinos Populares
                </Typography>
                <Grid container spacing={4}>
                    {popularDestinations.map((destination, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={destination.imageUrl}
                                    alt={destination.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {destination.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {destination.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Ofertas Especiales y Promociones */}
                <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '20px' }}>
                    Ofertas Especiales y Promociones
                </Typography>
                <Grid container spacing={4}>
                    {specialOffers.map((offer, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={offer.imageUrl}
                                    alt={offer.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {offer.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {offer.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Ver Oferta</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                        Descubre tu nuevo hospedaje favorito
                </Typography>
                
                <Grid container spacing={4} style={{ marginTop: '20px' }}>
                    {/* Simular tarjetas de oferta */}
                    {[1, 2, 3].map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://source.unsplash.com/random?travel-destinations&sig=${card}`}
                                    alt="imagen de viaje"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Destino {card}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Descripción del destino y ofertas especiales disponibles.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Ver Más</Button>
                                    <Button size="small">Reservar Ahora</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <footer style={{ marginTop: '20px', padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
                <Typography variant="h6">Agencia de Viajes</Typography>
                <Typography variant="subtitle1">
                    Conectando el mundo con las maravillas del viaje.
                </Typography>
            </footer>
        </div>
    );
};

export default HomePage;
