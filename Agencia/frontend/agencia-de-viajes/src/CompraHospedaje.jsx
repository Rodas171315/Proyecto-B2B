import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Container, Grid, TextField, Card, CardContent, Dialog, CardMedia, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Header from './Header'; 
import Footer from './Footer'; 
import { useUser } from './UserContext';
import emailjs from 'emailjs-com';

const CompraHospedaje = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { user } = useUser();
    const { hotelDetails, roomDetails, proveedorSeleccionado } = state; 
    const [openDialog, setOpenDialog] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardName, setCardName] = useState('');
    const [address, setAddress] = useState('');

    console.log("Proveedor seleccionado:", proveedorSeleccionado);

    const precioConDescuento = (precio) => precio - precio * 0.20;
    const realizarReserva = async () => {
        const formattedCheckIn = new Date(checkIn).toISOString().split('T')[0];
        const formattedCheckOut = new Date(checkOut).toISOString().split('T')[0];
        const precioPorNoche = Number(roomDetails.precioxnoche);
        const dias = (new Date(formattedCheckOut) - new Date(formattedCheckIn)) / (1000 * 60 * 60 * 24);
        const totalSinComision = precioPorNoche * dias;
        const descuento = totalSinComision * 0.20;
        const totalReserva = totalSinComision - descuento;
    
        const reservaData = {
            idHabitacion: roomDetails.id_habitacion,
            idHotel: hotelDetails.id_hotel,
            idUsuario: user.id,
            personasReserva: roomDetails.capacidad_personas,
            fechaIngreso: formattedCheckIn,
            fechaSalida: formattedCheckOut,
            totalReserva: Number(totalReserva.toFixed(2)), 
            codigoReserva: Math.floor(Math.random() * 1000000).toString(),
            estadoReserva: "confirmada",
        };

        try {
            console.log("Proveedor seleccionado:", proveedorSeleccionado);
            console.log("URL completa:", `${proveedorSeleccionado}/reservas/verificar-disponibilidad`);

            const responseDisponibilidad = await fetch(`${proveedorSeleccionado}/reservas/verificar-disponibilidad`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idHabitacion: reservaData.idHabitacion,
                    fechaIngreso: reservaData.fechaIngreso,
                    fechaSalida: reservaData.fechaSalida,
                }),
            });

            if (responseDisponibilidad.ok) {
                const disponibilidad = await responseDisponibilidad.json();
                if (!disponibilidad.esDisponible) {
                    alert('La habitación no está disponible para las fechas seleccionadas. Por favor, elige otras fechas.');
                    return;
                }
            } else {
                throw new Error('No se pudo verificar la disponibilidad de la habitación');
            }
            console.log("Proveedor seleccionado:", proveedorSeleccionado);
            console.log("URL completa:", `${proveedorSeleccionado}/reservas/verificar-disponibilidad`);
            
            const responseReserva = await fetch(`${proveedorSeleccionado}/reservas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservaData),
            });

            if (responseReserva.ok) {
                console.log('Reserva realizada con éxito');
    
               
                const templateParams = {
                    to_name: user.primer_nombre, 
                    to_email: user.email, 
                };
    
                
                emailjs.send('service_97sfyyu', 'template_vt8izap', templateParams, 'JuvkFpFUkVC3f6giZ')
                    .then((result) => {
                        console.log('Correo enviado exitosamente', result.text);
                    }, (error) => {
                        console.log('Error al enviar correo', error.text);
                    });
    
                
                setOpenDialog(true);
            } else {
                const errorText = await responseReserva.text();
                throw new Error(`Error al realizar la reserva: ${errorText}`);
            }
        } catch (error) {
            console.error('Error al realizar la reserva:', error);
            alert('Hubo un error al procesar tu reserva. Por favor, intenta nuevamente.');
        }
    };
    

    return (
        <div>
            <Header />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card>
                    <CardMedia
                        component="img"
                        height="140"
                        image={`https://source.unsplash.com/random?hotelRoom&sig=`}
                        alt="Habitación"
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2">Reserva de Hospedaje</Typography>
                        <Typography variant="body1">Hotel: {hotelDetails.nombre}</Typography>
                        <Typography variant="body1">Habitación: {roomDetails.tipo_habitacion}</Typography>
                        <Typography variant="body1">
                            Precio por noche: <s>${roomDetails.precioxnoche}</s> ${precioConDescuento(Number(roomDetails.precioxnoche)).toFixed(2)}
                        </Typography>
                        <TextField
                            type="date"
                            fullWidth
                            label="Check-In"
                            margin="normal"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                        <TextField
                            type="date"
                            fullWidth
                            label="Check-Out"
                            margin="normal"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                        
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
                        <Button variant="contained" color="primary" onClick={realizarReserva} sx={{ mt: 2 }}>
                            Realizar Reserva
                        </Button>
                    </CardContent>
                </Card>
            </Container>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Reserva realizada con éxito</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tu reserva ha sido completada exitosamente. Pronto recibirás más información.
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

export default CompraHospedaje;

