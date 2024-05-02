import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardContent, CardActions, Button, CardMedia, TextField } from '@mui/material';
import Header from './Header'; 
import Footer from './Footer'; 

const PaquetesDisponibles = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [paquetes, setPaquetes] = useState(location.state?.paquetes || []);
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');

    const filtrarPaquetes = () => {
        return paquetes.filter(paquete => {
            const precioPaquete = paquete.precioA + paquete.precioH;
            return (!precioMin || precioPaquete >= precioMin) &&
                   (!precioMax || precioPaquete <= precioMax);
        });
    };

    useEffect(() => {
        const fetchPaquetes = async () => {
            try {
                const resPaquetes = await fetch(process.env.REACT_APP_BACKEND_URL + '/paquetes');
                if (!resPaquetes.ok) throw new Error('Network response was not ok for paquetes');
                let paquetesData = await resPaquetes.json();

                paquetesData = await Promise.all(paquetesData.map(async (paquete) => {
                    console.log(`Fetching vuelo with ID: ${paquete.idVuelo}`);
                    console.log(`Fetching vuelo with ID: ${paquete.idHabitacion}`);
                    const [hotelRes, habitacionRes, vueloRes] = await Promise.all([
                        fetch(`http://localhost:8080/hoteles/${paquete.idHotel}`),
                        fetch(`http://localhost:8080/habitaciones/${paquete.idHabitacion}`),
                        fetch(process.env.REACT_APP_AIRLINE_BACKEND_URL + `/vuelos/${paquete.idVuelo}`),
                    ]);
                
                    const hotel = await hotelRes.json();
                    const habitacion = await habitacionRes.json();
                    console.log(`Received habitacion data:`, habitacionRes);
                    const vuelo = await vueloRes.json();
                    console.log(`Received vuelo data:`, vuelo);
                    
                    return {
                        ...paquete,
                        hotel: hotel.nombre, 
                        habitacion: habitacion.tipo_habitacion, 
                        precioH: habitacion.precioxnoche,
                        vuelo: `${vuelo.ciudad_origen} a ${vuelo.ciudad_destino}`,
                        precioA: vuelo.precio,
                        fecha: vuelo.fecha_salida,
                    };
                }));
                
                setPaquetes(paquetesData);
            } catch (error) {
                console.error('Error al obtener los paquetes:', error);
            }
        };

        fetchPaquetes();
    }, []);


    return (
        <div>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Paquetes Disponibles
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Precio Mínimo"
                            type="number"
                            variant="outlined"
                            value={precioMin}
                            onChange={(e) => setPrecioMin(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Precio Máximo"
                            type="number"
                            variant="outlined"
                            value={precioMax}
                            onChange={(e) => setPrecioMax(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    {filtrarPaquetes().map((paquete, index) => (
                        <Grid item key={paquete.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://source.unsplash.com/random?hotelRoom&sig=${index}`}
                                    alt="Imagen del aeropuerto"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {paquete.nombrePaquete}
                                    </Typography>
                                    <Typography>
                                        Hotel: {paquete.hotel}
                                    </Typography>
                                    <Typography>
                                        Habitación: {paquete.habitacion}
                                    </Typography>
                                    <Typography>
                                        Precio por Noche: ${paquete.precioH}
                                    </Typography>
                                    <Typography>
                                        Vuelo: {paquete.vuelo}
                                    </Typography>
                                    <Typography>
                                        Descripcion: {paquete.descripcion}
                                    </Typography>
                                    <Typography>
                                        Estado del paquete: {paquete.estadoPaquete}
                                    </Typography>
                                    <Typography>
                                        Precio de vuelo: ${paquete.precioA}
                                    </Typography>
                                    <Typography>
                                        Fecha Salida: {paquete.fecha}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {paquete.estadoPaquete === 'Disponible' && (
                                        <Button size="small" onClick={() => navigate('/compra-paquete', { state: { paquete } })}>
                                            Comprar
                                        </Button>
                                    )}
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

