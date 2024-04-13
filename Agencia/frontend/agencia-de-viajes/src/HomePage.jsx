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
        const paisSeleccionadoDestinos = 'Estados Unidos'; 
        const paisSeleccionadoFavoritos = 'Guatemala'; 
        const paisSeleccionadoOfertas = 'Mexico'; 
        
        fetch(`http://35.211.214.127:8080/hoteles/por-pais/${paisSeleccionadoDestinos}`)
            .then((response) => response.json())
            .then(data => {
                console.log(data); 
                setDestinosPopulares(data.slice(0, 3));
            })
            .catch((error) => console.error("Error al cargar destinos populares para " + paisSeleccionadoDestinos + ":", error));
    
        fetch(`http://35.211.214.127:8080/hoteles/por-pais/${paisSeleccionadoOfertas}`)
            .then((response) => response.json())
            .then(data => {
                console.log(data); 
                setOfertasEspeciales(data.slice(0, 3));
            })
            .catch((error) => console.error("Error al cargar ofertas especiales:" + paisSeleccionadoOfertas + ":", error));
    
        fetch(`http://35.211.214.127:8080/hoteles/por-pais/${paisSeleccionadoFavoritos}`)
            .then((response) => response.json())
            .then(data => {
                console.log(data); 
                setHospedajesFavoritos(data.slice(0, 3));
            })
            .catch((error) => console.error("Error al cargar hospedajes favoritos para " + paisSeleccionadoFavoritos + ":", error));
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
                {destinosPopulares.map((hotel, index) => (
                    
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://source.unsplash.com/random?estadosunidos&sig=${index}`}
                                alt="Imagen del aeropuerto"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {hotel.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Ubicado en {hotel.ciudad}, {hotel.pais}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Dirección: {hotel.direccion}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Check-in: {hotel.checkin?.toString().substr(0,5)} / Check-out: {hotel.checkout?.toString().substr(0,5)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Button size="small" onClick={() => navigate(`/hospedajes-disponibles`, { state: { paisSeleccionado: hotel.pais, hoteles: [hotel] } })}>
                                        Ver Detalles
                                    </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    Ofertas Especiales y Promociones
                </Typography>
                <Grid container spacing={4}>
                    {ofertasEspeciales.map((hotel, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://source.unsplash.com/random?mexico&sig=${index}`}
                                alt="Imagen del aeropuerto"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {hotel.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Ubicado en {hotel.ciudad}, {hotel.pais}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Dirección: {hotel.direccion}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Check-in: {hotel.checkin?.toString().substr(0,5)} / Check-out: {hotel.checkout?.toString().substr(0,5)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Button size="small" onClick={() => navigate(`/hospedajes-disponibles`, { state: { paisSeleccionado: hotel.pais, hoteles: [hotel] } })}>
                                        Ver Detalles
                                    </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    Descubre tu hospedaje favorito
                </Typography>
                <Grid container spacing={4}>
                    {hospedajesFavoritos.map((hotel, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://source.unsplash.com/random?guatemala&sig=${index}`}
                                    alt="Imagen del aeropuerto"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {hotel.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Ubicado en {hotel.ciudad}, {hotel.pais}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Dirección: {hotel.direccion}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Check-in: {hotel.checkin?.toString().substr(0,5)} / Check-out: {hotel.checkout?.toString().substr(0,5)}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                <Button size="small" onClick={() => navigate(`/hospedajes-disponibles`, { state: { paisSeleccionado: hotel.pais, hoteles: [hotel] } })}>
                                        Ver Detalles
                                    </Button>
                                </CardActions>
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