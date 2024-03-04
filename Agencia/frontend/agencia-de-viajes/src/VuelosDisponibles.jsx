import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const vuelos = [
    { id: 1, origen: "Ciudad de México", destino: "Tokio", hora: "10:00 AM", aerolinea: "Aeroméxico", precio: "800 USD" },
    { id: 2, origen: "Bogotá", destino: "París", hora: "4:00 PM", aerolinea: "Air France", precio: "500 USD" },
    
    // Agrega más vuelos aquí
];

const VuelosDisponibles = () => {
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
                    {vuelos.map((vuelo) => (
                        <Grid item key={vuelo.id} xs={12} sm={6} md={4}>
                            <Card>
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
