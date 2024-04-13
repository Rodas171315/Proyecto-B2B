import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Container, TextField, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CardMedia } from '@mui/material';
import Header from './Header'; 
import Footer from './Footer'; 

const CompraPaquete = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { paquete } = location.state || {};

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const completarCompra = async () => {
        setOpenDialog(true);
    };

    if (!paquete) {
        return <Typography variant="h6">Cargando información del paquete...</Typography>;
    }

    return (
        <div>
            <Header />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card>
                <CardMedia
                    component="img"
                    height="140"
                    image={`https://source.unsplash.com/random?airport`}
                    alt="Imagen del aeropuerto"
                />
                    <CardContent>
                        <Typography variant="h5" component="h2">Compra de Paquete</Typography>
                        <Typography variant="body1">Paquete: {paquete.nombrePaquete}</Typography>
                        <Typography variant="body1">Paquete: {paquete.descripcion}</Typography>
                        <Typography variant="body1">Vuelo, Origen: {paquete.vuelo.origen}, Destino: {paquete.vuelo.destino}, Aerolínea: {paquete.vuelo.aerolinea}</Typography>
                        <Typography variant="body1">Hospedaje: {paquete.hospedaje.nombre} en {paquete.hospedaje.ciudad}</Typography>
                        <Typography variant="body1">Precio Total: {paquete.precioTotal}</Typography>
                        <TextField
                            fullWidth
                            label="Nombre"
                            margin="normal"
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <TextField
                            fullWidth
                            label="Teléfono"
                            margin="normal"
                            value={telefono} 
                            onChange={(e) => setTelefono(e.target.value)} 
                        />
                        <TextField
                            fullWidth
                            label="Número de Tarjeta"
                            margin="normal"
                            value={numeroTarjeta} 
                            onChange={(e) => setNumeroTarjeta(e.target.value)} 
                        />
                        <Button variant="contained" color="primary" onClick={completarCompra} sx={{ mt: 2 }}>
                            Completar Compra
                        </Button>
                    </CardContent>
                </Card>
            </Container>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogTitle id="dialog-title">Compra realizada con éxito</DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-description">
                        Tu compra ha sido completada exitosamente. Pronto recibirás más información.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate('/')} color="primary">
                        Volver al inicio
                    </Button>
                </DialogActions>
            </Dialog>
            <Footer />
        </div>
    );
};

export default CompraPaquete;
