import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Container, TextField, Card, Grid, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useUser } from './UserContext';
import emailjs from 'emailjs-com';

const CompraVuelo = () => {
  const { vuelo, proveedorSeleccionado } = useLocation().state;
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
      const precioConDescuento = tipoAsiento === 'ejecutivo'
        ? vuelo.precio * 1.5 * cantidad * 0.8 
        : vuelo.precio * cantidad * 0.8;
  
        console.log(proveedorSeleccionado);
      const response = await fetch(`${proveedorSeleccionado}/boletos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: '6610fa0f69bd0f1affec1601',
          vueloId: vuelo._id,
          tipoAsiento,
          cantidad,
          precioFinal: precioConDescuento,
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

      const responseData = await response.json();
      enviarCorreoConfirmacion(responseData._id);

      setDialogMessage('Tu compra ha sido completada exitosamente. Pronto recibirás más información.');
      setOpenDialog(true);
    } catch (error) {
      console.error('Error al completar la compra:', error);
      setDialogMessage('Ocurrió un error al completar la compra del vuelo: ' + error.message);
      setOpenDialog(true);
    }
  };

  const enviarCorreoConfirmacion = (boletoId) => {
    const templateParams = {
      to_name: user.primer_nombre,
      to_email: user.email,
      boleto_id: boletoId,
      origen: vuelo.ciudad_origen,
      destino: vuelo.ciudad_destino,
      fecha_salida: new Date(vuelo.fecha_salida).toLocaleDateString(),
      tipo_asiento: tipoAsiento,
      cantidad_asientos: cantidad,
      precio_total: tipoAsiento === 'ejecutivo'
        ? vuelo.precio * 1.5 * cantidad * 0.8 
        : vuelo.precio * cantidad * 0.8
    };

    emailjs.send('service_4adadnq', 'template_yzzo538', templateParams, 'lJbXMAjWOnj53YJai')
      .then((result) => {
          console.log('Correo enviado exitosamente', result.text);
      }, (error) => {
          console.log('Error al enviar correo', error.text);
      });
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
                        <Typography variant="body1">
                          Precio: 
                          <span style={{ textDecoration: 'line-through' }}>{vuelo.precio}</span>
                          {' '}c/u{' '}
                          <span style={{ color: 'green' }}>
                            {Math.round(vuelo.precio * 0.8 * 100) / 100} c/u (20% de descuento aplicado)
                          </span>
                        </Typography>

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

