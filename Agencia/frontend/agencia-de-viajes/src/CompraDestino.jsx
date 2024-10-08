import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Container, TextField, Button, Card, CardContent, Dialog, CardMedia, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Header from './Header'; 
import Footer from './Footer'; 

const CompraDestino = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [destino, setDestino] = useState({});
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchDestino = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/contenido-estatico/destinos-populares/${id}`);
                if (!response.ok) throw new Error('No se pudo obtener el destino');
                const data = await response.json();
                setDestino(data);
            } catch (error) {
                console.error('Error al cargar el destino:', error);
            }
        };

        fetchDestino();
    }, [id]);

    const completarCompra = () => {
        
        console.log('Compra completada con éxito');
        setOpenDialog(true);
    };

    return (
        <div>
            <Header />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card>
                <CardMedia
                    component="img"
                    height="250"
                    image={destino.imagen}
                    alt={`Imagen de ${destino.ciudad}`}
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2"> {destino.ciudad}</Typography>
                        <Typography variant="h5" component="h2"> {destino.descripcion}</Typography>
                        <Typography variant="h5" component="h2"> ${destino.precio}</Typography>
                        <TextField fullWidth label="Nombre" margin="normal" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField fullWidth label="Teléfono" margin="normal" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        <TextField fullWidth label="Número de Tarjeta" margin="normal" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} />
                        <Button variant="contained" color="primary" onClick={completarCompra} sx={{ mt: 2 }}>
                            Completar Compra
                        </Button>
                    </CardContent>
                </Card>
            </Container>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Compra Realizada</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        La compra ha sido completada exitosamente. Pronto recibirás más información en tu correo electrónico.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate('/')} color="primary">Volver al Inicio</Button>
                </DialogActions>
            </Dialog>
            <Footer />
        </div>
    );
};

export default CompraDestino;
