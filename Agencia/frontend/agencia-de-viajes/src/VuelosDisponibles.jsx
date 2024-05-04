import React, { useState } from 'react';
import { Typography, Button, Container, Grid, Card, CardContent, CardMedia, CardActions, TextField } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';

const VuelosDisponibles = () => {
    const location = useLocation();
    const { vuelos, proveedorSeleccionado } = location.state || { vuelos: [], proveedorSeleccionado: '' };
    const navigate = useNavigate();

    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');

    const filtrarVuelos = () => {
        return vuelos.filter(vuelo => {
            const precio = vuelo.precio;
            return (!precioMin || precio >= precioMin) &&
                   (!precioMax || precio <= precioMax);
        });
    };

    const comprarVuelo = (vuelo) => {
        console.log("Enviando proveedor a CompraVuelo:", proveedorSeleccionado);
        navigate('/compra-vuelo', { state: { vuelo, proveedorSeleccionado: proveedorSeleccionado } });
    };

    return (
        <div>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Vuelos Disponibles
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
                {filtrarVuelos().length > 0 ? (
                    <Grid container spacing={4}>
                        {filtrarVuelos().map((vuelo, index) => (
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
                                        <Typography variant="body1" > Cuidad de escala: {vuelo.ciudad_escala}</Typography>
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



