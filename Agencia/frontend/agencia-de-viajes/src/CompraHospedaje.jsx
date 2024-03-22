import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Container, TextField, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Header from './Header'; 
import Footer from './Footer'; 

const CompraHospedaje = () => {
    const location = useLocation();
    const hospedaje = location.state.hospedaje; 
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const completarCompra = () => {
        
        console.log('Compra completada');
        setOpenDialog(true);
    };

    return (
        <div>
            <Header />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">Compra de Hospedaje</Typography>
                        <Typography variant="body1">Nombre: {hospedaje.nombre}</Typography>
                        <Typography variant="body1">Descripción: {hospedaje.descripcion}</Typography>
                        <Typography variant="body1">Precio: {hospedaje.precio}</Typography>
                        <TextField fullWidth label="Nombre" margin="normal" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField fullWidth label="Teléfono" margin="normal" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        <TextField fullWidth label="Número de Tarjeta" margin="normal" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} />
                        <Button variant="contained" color="primary" onClick={completarCompra}>
                            Completar Compra
                        </Button>
                    </CardContent>
                </Card>
            </Container>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Compra realizada con éxito</DialogTitle>
                <DialogContent>
                    <DialogContentText>Tu compra ha sido completada exitosamente. Pronto recibirás más información.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate('/')} color="primary">Volver al inicio</Button>
                </DialogActions>
            </Dialog>
            <Footer />
        </div>
    );
};

export default CompraHospedaje;
