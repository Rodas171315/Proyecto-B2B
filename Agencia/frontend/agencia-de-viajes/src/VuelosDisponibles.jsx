import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Container, Grid, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const VuelosDisponibles = () => {
    const location = useLocation();
    const { vuelos } = location.state || { vuelos: [] };
    const navigate = useNavigate();

    const comprarVuelo = (vuelo) => {
        navigate('/compra-vuelo', { state: { vuelo } });
    };

    return (
        <div>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Vuelos Disponibles
                </Typography>
                {vuelos.length > 0 ? (
                    <Grid container spacing={4}>
                        {vuelos.map((vuelo, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://source.unsplash.com/random?airport&sig=${index}`}
                                        alt="Imagen del aeropuerto"
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">{`${vuelo.ciudad_origen} - ${vuelo.ciudad_destino}`}</Typography>
                                        <Typography>{`Fecha y Hora: ${new Date(vuelo.fecha_salida).toLocaleString()}`}</Typography>
                                        
                                        <Typography>{`Precio: $${vuelo.precio}`}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => comprarVuelo(vuelo)}>
                                            Comprar
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography>No se encontraron vuelos disponibles.</Typography>
                )}
            </Container>
            <Footer />
        </div>
    );
};

export default VuelosDisponibles;



