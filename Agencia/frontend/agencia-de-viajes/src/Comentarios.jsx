import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Container } from '@mui/material';

function Comentarios({ idHabitacion, proveedorSeleccionado }) {
    const [comentarios, setComentarios] = useState([]);
    const [mostrarComentarios, setMostrarComentarios] = useState(false);

    useEffect(() => {
        if (proveedorSeleccionado) {
            fetchComentarios();
        } else {
            console.error('Proveedor no definido');
        }
    }, [idHabitacion, proveedorSeleccionado]);


const fetchComentarios = async () => {
    console.log('URL utilizada para comentarios:', proveedorSeleccionado);
    try {
        const response = await fetch(`${proveedorSeleccionado}/comentarios/por-habitacion/${idHabitacion}`);
        if (response.ok) {
            const data = await response.json();
            setComentarios(data);
        } else {
            console.error('Error al recuperar los comentarios:', response.statusText);
        }
    } catch (error) {
        console.error('Error al recuperar los comentarios:', error);
    }
};

    

    const toggleComentarios = () => {
        setMostrarComentarios(!mostrarComentarios);
    };

    const renderComentarios = () => (
        <Box>
            {comentarios.map(comentario => (
                <Card key={comentario.idComentario} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{comentario.nombreUsuario} - {comentario.rating} estrellas</Typography>
                        <Typography>{comentario.textoComentario}</Typography>
                        <Typography sx={{ fontSize: '0.8em', color: '#666' }}>
                            Publicado: {new Date(comentario.fechaComentario).toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );

    return (
        <Container>
            <Button onClick={toggleComentarios} sx={{ mt: 2, mb: 2 }}>
                {mostrarComentarios ? 'Ocultar Comentarios' : 'Ver Comentarios'}
            </Button>
            {mostrarComentarios && renderComentarios()}
        </Container>
    );
}

export default Comentarios;

