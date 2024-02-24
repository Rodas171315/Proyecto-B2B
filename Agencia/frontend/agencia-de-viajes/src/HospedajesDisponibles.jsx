import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';


const hospedajes = [
    { id: 1, nombre: "Hotel Sunset", descripcion: "Cerca de la playa, con vista al mar.", precio: "150 USD por noche" },
    { id: 2, nombre: "Montaña Mágica", descripcion: "Rodeado de naturaleza y tranquilidad.", precio: "100 USD por noche" },
    
];

const HospedajesDisponibles = () => {
    return (
        <Grid container spacing={4}>
            {hospedajes.map((hospedaje) => (
                <Grid item key={hospedaje.id} xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{hospedaje.nombre}</Typography>
                            <Typography>{hospedaje.descripcion}</Typography>
                            <Typography>{hospedaje.precio}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default HospedajesDisponibles;
