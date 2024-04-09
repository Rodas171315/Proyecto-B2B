import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import Header from './Header'; 
import Footer from './Footer'; 
import emailjs from 'emailjs-com';

const AllReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [agencyUsers, setAgencyUsers] = useState([]);
  const [flightReservations, setFlightReservations] = useState([]);

  useEffect(() => {
    fetchAgencyUsersAndReservations();
    fetchFlightReservations();
  }, []);

  const fetchAgencyUsersAndReservations = async () => {
    try {
      const reservationsPromise = fetch(`http://localhost:8080/reservas/detalle/todas`);
      const usersPromise = fetch(`http://localhost:8081/usuarios`);
      const [reservationsResponse, usersResponse] = await Promise.all([reservationsPromise, usersPromise]);

      if (reservationsResponse.ok && usersResponse.ok) {
        const reservationsData = await reservationsResponse.json();
        const usersData = await usersResponse.json();
        const agencyUserIds = new Set(usersData.map(user => user.id));
        
        const filteredReservations = reservationsData.filter(reservation => agencyUserIds.has(reservation.idUsuario));
        setReservations(filteredReservations);
        setAgencyUsers(usersData);
      } else {
        console.error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const fetchFlightReservations = async () => {
    try {
      
      const response = await fetch(`http://35.211.214.127:8800/boletos`);
      if (!response.ok) {
        throw new Error('Error al cargar reservas de vuelos');
      }
      const data = await response.json();
      setFlightReservations(data); 
    } catch (error) {
      console.error('Error al cargar reservas de vuelos:', error);
    }
  };


  const calculateNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    return Math.ceil(diffTime / (1000 * 3600 * 24));
  };

  const cancelarReserva = async (idReserva) => {
    try {
      const response = await fetch(`http://localhost:8080/reservas/${idReserva}/cancelar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        
        const reservationDetails = reservations.find(res => res.idReserva === idReserva);
        const userDetails = agencyUsers.find(user => user.id === reservationDetails.idUsuario);
        
        
        const emailParams = {
          to_name: userDetails.nombre, 
          to_email: userDetails.email, 
          hotel_name: reservationDetails.nombreHotel,
          check_in_date: reservationDetails.fechaIngreso,
          check_out_date: reservationDetails.fechaSalida,
        };
  
        
        emailjs.send('service_521uswb', 'template_78rxtg3', emailParams, 'BaaC73U6PfMwmi5uk')
          .then((result) => {
              console.log('Email sent:', result.text);
          }, (error) => {
              console.error('Email send error:', error.text);
          });
  
        alert('Reserva cancelada con éxito');
        fetchAgencyUsersAndReservations(); 
      } else {
        throw new Error('No se pudo cancelar la reserva');
      }
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      alert('Error al cancelar la reserva');
    }
  };

  const cancelarBoletoVuelo = async (idBoleto) => {
    const url = `http://35.211.214.127:8800/boletos/cancelar/${idBoleto}`; 
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('No se pudo cancelar el boleto de vuelo');
      }
  
      
  
      alert('Boleto de vuelo cancelado con éxito');
      fetchAgencyUsersAndReservations(); 
    } catch (error) {
      console.error('Error al cancelar el boleto de vuelo:', error);
      alert('Error al cancelar el boleto de vuelo');
    }
  };

  function renderFlightReservations() {
    if (flightReservations.length > 0) {
        return (
            <Grid container spacing={4}>
                {flightReservations.map((reservation, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://source.unsplash.com/random?airplane&sig=${index}`}
                                alt="Imagen de vuelo"
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {`Vuelo: ${reservation.ciudad_origen} a ${reservation.ciudad_destino}`}
                                </Typography>
                                <Typography color="textSecondary">
                                    Fecha y Hora: {new Date(reservation.fecha_salida).toLocaleString()}
                                </Typography>
                                <Typography color="textSecondary">
                                    Precio: ${reservation.precioFinal}
                                </Typography>
                                <Typography color="textSecondary">
                                    Estado: {reservation.estadoReserva ? "Confirmada" : "Cancelada"}
                                </Typography>
                                {reservation.estadoReserva && (
                                    <Button 
                                        color="secondary" 
                                        onClick={() => cancelarBoletoVuelo(reservation._id)}
                                    >
                                        Cancelar Reserva
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    } else {
        return <Typography>No se encontraron reservas de vuelos.</Typography>;
    }
}

  return (
    <div>
        <Header />
            <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Todas las Reservas
            </Typography>
            {reservations.length > 0 ? (
                <Grid container spacing={4}>
                {reservations.map((reservation, index) => (
                    <Grid item xs={12} sm={6} md={4} key={reservation.idReserva}>
                    <Card>
                    <CardMedia
                            component="img"
                            height="140"
                            image={`https://source.unsplash.com/random?hotelRoom&sig=${index}`}
                            alt={`Habitación`}
                        />
                        <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Hotel: {reservation.nombreHotel}
                        </Typography>
                        <Typography color="textSecondary">Check-in: {reservation.fechaIngreso}</Typography>
                        <Typography color="textSecondary">Check-out: {reservation.fechaSalida}</Typography>
                        <Typography color="textSecondary">Noches: {calculateNights(reservation.fechaIngreso, reservation.fechaSalida)}</Typography>
                        <Typography color="textSecondary">Total: ${reservation.totalReserva}</Typography>
                        <Typography color="textSecondary">Usuario: {reservation.idUsuario}</Typography>
                        <Typography color="textSecondary">Reserva: {reservation.estadoReserva}</Typography>
                        {reservation.estadoReserva !== "Cancelada" && (
                          <Button color="secondary" onClick={() => cancelarReserva(reservation.idReserva)}>
                              Cancelar Reserva
                          </Button>
                        )}
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            ) : (
                <Typography>No se encontraron reservas.</Typography>
            )}
            </Container>
            <Container maxWidth="md">
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
              Todas las Reservas de Vuelos
          </Typography>
          {renderFlightReservations()}
        </Container>
        <Footer />
    </div>
  );
};

export default AllReservationsList;

