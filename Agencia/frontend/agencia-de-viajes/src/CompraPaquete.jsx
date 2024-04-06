import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Container, TextField, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CardMedia } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import emailjs from 'emailjs-com';
import { useUser } from './UserContext';

const CompraPaquete = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { paquete } = state; 
    const [openDialog, setOpenDialog] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const { user } = useUser();
    

    const realizarReserva = async () => {
        const formattedCheckIn = new Date(checkIn).toISOString().split('T')[0];
        const formattedCheckOut = new Date(checkOut).toISOString().split('T')[0];
        const codigoReserva = Math.floor(Math.random() * 1000000).toString();
        
        try {
            
            const responseHabitacion = await fetch(`http://localhost:8080/habitaciones/${paquete.idHabitacion}`);
            if (!responseHabitacion.ok) {
                throw new Error('Error al obtener detalles de la habitación');
            }
            const habitacion = await responseHabitacion.json();
            console.log("Datos de la habitación:", habitacion);
    
            
            const capacidadPersonas = habitacion.capacidad_personas;
    
            
            const responseDisponibilidad = await fetch('http://localhost:8080/reservas/verificar-disponibilidad', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idHabitacion: paquete.idHabitacion,
                    fechaIngreso: formattedCheckIn,
                    fechaSalida: formattedCheckOut,
                }),
            });
    
            if (!responseDisponibilidad.ok) {
                throw new Error('No se pudo verificar la disponibilidad de la habitación');
            }
    
            const disponibilidad = await responseDisponibilidad.json();
    
            if (!disponibilidad.esDisponible) {
                alert('La habitación no está disponible para las fechas seleccionadas. Por favor, elige otras fechas.');
                return;
            }
            
            
            const checkInDate = new Date(formattedCheckIn);
            const checkOutDate = new Date(formattedCheckOut);
            const timeDiff = checkOutDate - checkInDate;
            const noches = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

            if (noches <= 0) {
                alert("Las fechas de check-in y check-out no son válidas.");
                return;
            }

            const precioPorNoche = parseFloat(habitacion.precioxnoche);

            if (isNaN(precioPorNoche) || precioPorNoche <= 0) {
                console.error("El precio por noche obtenido no es válido:", habitacion.precioxnoche);
                alert("El precio por noche no es válido.");
                return;
            }

            const precioTotal = noches * precioPorNoche;
            if (isNaN(precioTotal) || precioTotal <= 0) {
                alert("No se pudo calcular el precio total de la estancia.");
                return;
            }
            
            const reservaData = {
                idHabitacion: paquete.idHabitacion,
                idHotel: paquete.idHotel,
                idUsuario: user.id,
                fechaIngreso: formattedCheckIn,
                fechaSalida: formattedCheckOut,
                codigoReserva: codigoReserva,
                personasReserva: capacidadPersonas,
                totalReserva: parseFloat(precioTotal.toFixed(2)),
            };
    
            console.log("Datos de reserva a enviar:", reservaData);
    
            
            const responseReserva = await fetch('http://localhost:8080/reservas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservaData),
            });
            
            const actualizarEstadoPaquete = async () => {
                try {
                    const response = await fetch(`http://localhost:8081/paquetes/${paquete.idPaquete}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ...paquete, 
                            estadoPaquete: 'Comprado' 
                        }),
                    });
            
                    if (!response.ok) {
                        throw new Error('No se pudo actualizar el estado del paquete.');
                    }
                    console.log('Estado del paquete actualizado a Comprado con éxito.');
                } catch (error) {
                    console.error('Error al actualizar el estado del paquete:', error);
                    alert('Hubo un error al actualizar el estado del paquete. Por favor, intenta nuevamente.');
                }
            };


            if (responseReserva.ok) {
                console.log('Reserva realizada con éxito');
                setOpenDialog(true);
                await actualizarEstadoPaquete();
            
                
                
                
                const templateParams = {
                    to_name: user.name, 
                    to_email: user.email, 
                    
                };
            
                
                emailjs.send('service_97sfyyu', 'template_vt8izap', templateParams, 'JuvkFpFUkVC3f6giZ')
                    .then((response) => {
                        console.log('Correo enviado exitosamente', response.text);
                    }, (error) => {
                        console.log('Error al enviar correo', error.text);
                    });
            } else {
                
                const errorText = await responseReserva.text();
                throw new Error(`Error al realizar la reserva: ${errorText}`);
            }
    
            console.log('Reserva realizada con éxito');
            setOpenDialog(true);
    
            
    
        } catch (error) {
            console.error('Error al realizar la reserva:', error);
            alert('Hubo un error al procesar tu reserva. Por favor, intenta nuevamente.');
        }
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
                        image={`https://source.unsplash.com/random?hotelRoom&sig=${paquete.id}`}
                        alt={`Habitación del paquete ${paquete.nombrePaquete}`}
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2">Reserva de Paquete</Typography>
                        <Typography variant="body1">Paquete: {paquete.nombrePaquete}</Typography>
                        <Typography variant="body1">Descripcion: {paquete.descripcion}</Typography>
                        
                        
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
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={realizarReserva}
                            sx={{ mt: 2 }}
                        >
                            Realizar Reserva
                        </Button>
                    </CardContent>
                </Card>
            </Container>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Reserva Confirmada</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tu reserva ha sido completada exitosamente. Pronto recibirás un correo con más información.
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
