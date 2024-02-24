import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// Datos de ejemplo
const vuelos = [
    { id: 1, aerolinea: "AirFly", hora: "08:00 AM", destino: "Nueva York", precio: "300 USD" },
    { id: 2, aerolinea: "SkyHigh", hora: "04:00 PM", destino: "París", precio: "450 USD" },
    // Agrega más vuelos aquí
];

const VuelosDisponibles = () => {
    return (
        <Grid container spacing={4}>
            {vuelos.map((vuelo) => (
                <Grid item key={vuelo.id} xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{`Destino: ${vuelo.destino}`}</Typography>
                            <Typography>{`Aerolínea: ${vuelo.aerolinea}`}</Typography>
                            <Typography>{`Hora: ${vuelo.hora}`}</Typography>
                            <Typography>{`Precio: ${vuelo.precio}`}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default VuelosDisponibles;
