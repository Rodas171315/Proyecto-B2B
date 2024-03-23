import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';
import Header from './Header'; 
import Footer from './Footer'; 


const PaquetesDisponibles = () => {
    const location = useLocation();
    const { paquetes } = location.state;
    const navigate = useNavigate();

    return (
        <div>
            <Header />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Paquetes Disponibles
            </Typography>
            <Grid container spacing={4}>
                {paquetes.map((paquete, index) => (
                    <Grid item key={paquete.id} xs={12} sm={6} md={4}>
                        <Card>
                        <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://source.unsplash.com/random?airport&sig=${index}`}
                                    alt="Imagen del aeropuerto"
                                />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {paquete.nombrePaquete}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {paquete.descripcion}
                                </Typography>
                                <Typography variant="body2">
                                    Origen: {paquete.vuelo.origen}
                                </Typography>
                                <Typography variant="body2">
                                    Destino: {paquete.vuelo.destino}
                                </Typography>
                                <Typography variant="body2">
                                    Aerolínea: {paquete.vuelo.aerolinea}
                                </Typography>
                                <Typography variant="body2">
                                    Hospedaje: {paquete.hospedaje.nombre} en {paquete.hospedaje.ciudad}
                                </Typography>
                                <Typography variant="body2">
                                    Precio Total: {paquete.precioTotal}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate('/compra-paquete', { state: { paquete } })}>Comprar</Button>
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

export default PaquetesDisponibles;
