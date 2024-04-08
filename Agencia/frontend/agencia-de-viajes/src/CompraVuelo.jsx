import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Typography, Button, Container, TextField, Card, Grid,
  CardContent, CardMedia, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, FormControl,
  InputLabel, Select, MenuItem
} from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useUser } from './UserContext';

const CompraVuelo = () => {
  const { vuelo } = useLocation().state;
  const navigate = useNavigate();
  const { user } = useUser();

  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [address, setAddress] = useState('');
  const [tipoAsiento, setTipoAsiento] = useState('turista');
  const [cantidad, setCantidad] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const completarCompra = async () => {
    try {
      const response = await fetch('http://35.211.214.127:8800/boletos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: '65fe775efd03e7de767d50e7', 
          vueloId: vuelo._id,
          tipoAsiento,
          cantidad
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo completar la compra del vuelo');
      }

     
      guardarReservaLocal({
        vueloId: vuelo._id,
        usuarioId: user.id, 
        tipoAsiento,
        cantidad,
        datosCompra: { cardNumber, cvv, cardName, address },
        detallesVuelo: {
          origen: vuelo.ciudad_origen,
          destino: vuelo.ciudad_destino,
          fechaSalida: vuelo.fecha_salida,
          precio: vuelo.precio,
        }
      });

      setDialogMessage('Tu compra ha sido completada exitosamente. Pronto recibirás más información.');
      setOpenDialog(true);
    } catch (error) {
      console.error('Error al completar la compra:', error);
      setDialogMessage('Ocurrió un error al completar la compra del vuelo: ' + error.message);
      setOpenDialog(true);
    }
  };

  const guardarReservaLocal = (reserva) => {
    const reservasActuales = JSON.parse(localStorage.getItem('reservasVuelosAgencia')) || [];
    reservasActuales.push(reserva);
    localStorage.setItem('reservasVuelosAgencia', JSON.stringify(reservasActuales));
  };
  
    return (
        <div>
            <Header />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card>
                <CardMedia
                        component="img"
                        height="140"
                        image={`https://source.unsplash.com/random?airport&sig=`}
                        alt="Habitación"
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2">Compra de Vuelo</Typography>
                        <Typography variant="body1">Origen: {vuelo.ciudad_origen}</Typography>
                        <Typography variant="body1">Destino: {vuelo.ciudad_destino}</Typography>
                        <Typography>{`Fecha y Hora: ${new Date(vuelo.fecha_salida).toLocaleString()}`}</Typography>
                        <Typography variant="body1">Precio: {vuelo.precio} c/u</Typography>
                        <Typography variant="body1">Asientos Dispoibles: Turista{vuelo.asientosTuristaDisponibles} - Ejecutivo{vuelo.asientosEjecutivosDisponibles}</Typography>
                        
                        <TextField
                            label="Número de Tarjeta"
                            fullWidth
                            margin="normal"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="CVV"
                                    fullWidth
                                    margin="normal"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Nombre en Tarjeta"
                                    fullWidth
                                    margin="normal"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            label="Dirección de Cobro"
                            fullWidth
                            margin="normal"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Tipo de Asiento</InputLabel>
                            <Select value={tipoAsiento} label="Tipo de Asiento" onChange={(e) => setTipoAsiento(e.target.value)}>
                                <MenuItem value="turista">Turista</MenuItem>
                                <MenuItem value="ejecutivo">Ejecutivo</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth label="Cantidad" type="number" margin="normal" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                        <Button variant="contained" color="primary" onClick={completarCompra}>Completar Compra</Button>
                    </CardContent>
                </Card>
            </Container>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{dialogMessage.includes('error') ? 'Error' : 'Compra realizada con éxito'}</DialogTitle>
                <DialogContent>
                <DialogContentText>{dialogMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => navigate('/')} color="primary">Volver al inicio</Button>
                </DialogActions>
            </Dialog>
            <Footer />
        </div>
    );
};

export default CompraVuelo;

