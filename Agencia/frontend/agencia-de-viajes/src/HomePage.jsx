import React, { useState, useEffect } from 'react';
import { Typography, Button, Container, Grid, Card, CardMedia, CardContent, Box, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';
import Header from './Header'; 
import Footer from './Footer'; 


const HomePage = () => {
    const navigate = useNavigate();
    const [destinosPopulares, setDestinosPopulares] = useState([]);
    const [ofertasEspeciales, setOfertasEspeciales] = useState([]);
    const [hospedajesFavoritos, setHospedajesFavoritos] = useState([]);

    useEffect(() => {
        
        fetch('http://localhost:8081/contenido-estatico//destinos-populares')
            .then((response) => response.json())
            .then(setDestinosPopulares)
            .catch((error) => console.error("Error al cargar destinos populares:", error));

        
        fetch('http://localhost:8081/contenido-estatico//promociones-ofertas-especiales')
            .then((response) => response.json())
            .then(setOfertasEspeciales)
            .catch((error) => console.error("Error al cargar ofertas especiales:", error));

        
        fetch('http://localhost:8081/contenido-estatico//descubre-hospedaje')
            .then((response) => response.json())
            .then(setHospedajesFavoritos)
            .catch((error) => console.error("Error al cargar hospedajes favoritos:", error));
    }, []);

    return (
        <div>
            <Header />
            
            <Box mt={4}> 
                <SearchForm />
            </Box>

            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Destinos Populares
                </Typography>
                <Grid container spacing={4}>
                    {destinosPopulares.map((destino, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={destino.imagen}
                                    alt={destino.ciudad}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {destino.ciudad}, {destino.pais}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {destino.descripcion}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => navigate(`/destinos-populares/${destino.id}`)}>Ver Detalles</Button>


                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    Ofertas Especiales y Promociones
                </Typography>
                <Grid container spacing={4}>
                    {ofertasEspeciales.map((oferta, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={oferta.imagen}
                                    alt={oferta.paquete}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {oferta.paquete}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {oferta.descripcion}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => navigate(`/promocion/${oferta.id}`)}>Ver Detalles</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    Descubre tu hospedaje favorito
                </Typography>
                <Grid container spacing={4}>
                    {hospedajesFavoritos.map((hospedaje, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={hospedaje.imagen}
                                    alt={hospedaje.nombre}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {hospedaje.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {hospedaje.descripcion}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Footer />
        </div>
    );

};
export default HomePage;