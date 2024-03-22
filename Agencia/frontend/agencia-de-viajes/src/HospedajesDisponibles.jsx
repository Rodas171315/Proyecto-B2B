import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const HospedajesDisponibles = () => {
    const [hospedajes, setHospedajes] = useState([]); 
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        
        if(location.state && location.state.hospedajes){
            setHospedajes(location.state.hospedajes);
        } else {
            
            console.error("No se proporcionaron datos de hospedajes");
        }
    }, [location.state]); 

    const verDetalles = (id) => {
        navigate(`/hospedajes/${id}`); 
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
