import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Container, TextField, Card, FormControl, Select, MenuItem, InputLabel, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CardMedia } from '@mui/material';
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
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardName, setCardName] = useState('');
    const [address, setAddress] = useState('');
    const [tipoAsiento, setTipoAsiento] = useState('turista');
    const [cantidad, setCantidad] = useState(1);
    const [precioVuelo, setPrecioVuelo] = useState(0);
    const [precioHabitacion, setPrecioHabitacion] = useState(0);
    const [fechaSalidaVuelo, setFechaSalidaVuelo] = useState('');

    useEffect(() => {
        
        if (paquete) {
            const fetchDatosPaquete = async () => {
                try {
                    const [resVuelo, resHabitacion] = await Promise.all([
                        fetch(process.env.REACT_APP_AIRLINE_BACKEND_URL + `/vuelos/${paquete.idVuelo}`),
                        fetch(`http://localhost:8080/habitaciones/${paquete.idHabitacion}`)
                    ]);
                    if (!resVuelo.ok || !resHabitacion.ok) {
                        throw new Error('Error al obtener datos del paquete');
                    }
                    const dataVuelo = await resVuelo.json();
                    const dataHabitacion = await resHabitacion.json();
                    setPrecioVuelo(dataVuelo.precio);
                    setPrecioHabitacion(dataHabitacion.precioxnoche);
                    setFechaSalidaVuelo(dataVuelo.fecha_salida);
                } catch (error) {
                    console.error('Error al obtener datos del paquete:', error);
                }
            };
            fetchDatosPaquete();
        }
    }, [paquete]);




    const realizarReserva = async () => {
        const formattedCheckIn = new Date(checkIn).toISOString().split('T')[0];
        const formattedCheckOut = new Date(checkOut).toISOString().split('T')[0];
        const codigoReserva = Math.floor(Math.random() * 1000000).toString();
        
        
        try {
            
            const apiUrl = process.env.REACT_APP_AIRLINE_BACKEND_URL + '/boletos'; 
            const responseBoleto = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuarioId: '65fe775efd03e7de767d50e7', 
                    vueloId: paquete.idVuelo,
                    tipoAsiento,
                    cantidad,
                    datosCompra: {
                        cardNumber,
                        cvv,
                        cardName,
                        address
                    }
                }),
            });
            
            if (!responseBoleto.ok) {
                throw new Error('No se pudo completar la compra del vuelo.');
            }
            
            const boletoData = await responseBoleto.json();
            console.log("Respuesta completa del boleto:", boletoData); 
            const idBoleto = boletoData[0]._id;   
            console.log("ID del Boleto:", idBoleto);
            

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
            
            const reservaHabitacion = await responseReserva.json();
            const idReservaHabitacion = reservaHabitacion.idReserva; 

            const actualizarEstadoPaquete = async () => {
                try {
                    const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/paquetes/${paquete.idPaquete}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ...paquete, 
                            estadoPaquete: 'Comprado',
                            idUsuario: user.id,
                            idReservaHabitacion: idReservaHabitacion,
                            idBoleto: idBoleto,
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

    const precioTotalSinDescuento = precioHabitacion + precioVuelo;
    const precioTotalConDescuento = precioTotalSinDescuento * 0.8; 

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
                        <Typography variant="body1">
                            Precio Habitación: ${precioHabitacion}
                        </Typography>
                        <Typography variant="body1">
                        Fecha de Salida del Vuelo: {new Date(fechaSalidaVuelo).toLocaleDateString()} 
                        </Typography>
                        <Typography variant="body1">
                            Precio Vuelo: ${precioVuelo}
                        </Typography>
                        <Typography variant="body1">
                            Precio Total: <span style={{ textDecoration: 'line-through' }}>${precioTotalSinDescuento}</span> {' '}
                            <span style={{ color: 'green' }}>${precioTotalConDescuento} (20% de descuento aplicado)</span>
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
                        <TextField label="Número de Tarjeta" fullWidth margin="normal" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                        <TextField label="CVV" fullWidth margin="normal" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                        <TextField label="Nombre en la Tarjeta" fullWidth margin="normal" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                        <TextField label="Dirección de Facturación" fullWidth margin="normal" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Tipo de Asiento</InputLabel>
                            <Select value={tipoAsiento} label="Tipo de Asiento" onChange={(e) => setTipoAsiento(e.target.value)}>
                                <MenuItem value="turista">Turista</MenuItem>
                                <MenuItem value="ejecutiva">Ejecutiva</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                        fullWidth
                        label="Cantidad"
                        type="number"
                        margin="normal"
                        value={cantidad}  
                        onChange={(e) => setCantidad(1)}  
                        InputProps={{
                            readOnly: true,  
                        }}
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

