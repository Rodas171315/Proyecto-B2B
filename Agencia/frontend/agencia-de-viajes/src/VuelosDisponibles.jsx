import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';

const VuelosDisponibles = () => {
    const location = useLocation(); 
    const { vuelos } = location.state || { vuelos: [] }; 
    const navigate = useNavigate(); 

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
                    Vuelos Disponibles
                </Typography>
                <Grid container spacing={4}>
                    {vuelos.map((vuelo, index) => (
                        <Grid item key={vuelo.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://source.unsplash.com/random?airport&sig=${index}`}
                                    alt="Imagen del aeropuerto"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">{`${vuelo.origen} - ${vuelo.destino}`}</Typography>
                                    <Typography>{`Hora: ${vuelo.hora}`}</Typography>
                                    <Typography>{`Aerolínea: ${vuelo.aerolinea}`}</Typography>
                                    <Typography>{`Precio: ${vuelo.precio}`}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default VuelosDisponibles;


