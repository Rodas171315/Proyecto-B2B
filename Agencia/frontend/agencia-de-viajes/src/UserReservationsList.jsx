import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useUser } from './UserContext';
import Header from './Header'; 
import Footer from './Footer'; 

const UserReservationsList = () => {
    const [reservations, setReservations] = useState([]);
    const { user } = useUser();
  
    useEffect(() => {
      if (user) {
        fetchReservations();
      }
    }, [user]);
  
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/reservas/detalle/usuario/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          console.error("Failed to fetch reservations.");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
  
    const calculateNights = (checkIn, checkOut) => {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const diffTime = Math.abs(checkOutDate - checkInDate);
      return Math.ceil(diffTime / (1000 * 3600 * 24));
    };
  
    const translateTipoHabitacion = (tipoHabitacion) => {
      const tipoHabitacionMap = {
        1: "Doble",
        2: "Junior Suite",
        3: "Suite",
        4: "Gran Suite",
      };
      return tipoHabitacionMap[tipoHabitacion] || "Desconocida";
    };

  return (
    <div>
        <Header />
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom>
                    Historial de Reservas
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
                                {reservation.nombreHotel}
                            </Typography>
                            <Typography color="textSecondary">Habitación: {translateTipoHabitacion(reservation.tipoHabitacion)}</Typography>
                            <Typography color="textSecondary">Check-in: {reservation.fechaIngreso}</Typography>
                            <Typography color="textSecondary">Check-out: {reservation.fechaSalida}</Typography>
                            <Typography color="textSecondary">Noches: {calculateNights(reservation.fechaIngreso, reservation.fechaSalida)}</Typography>
                            <Typography color="textSecondary">Total: ${reservation.totalReserva}</Typography>
                            <Typography color="textSecondary">Estado: {reservation.estadoReserva}</Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                    ))}
                    </Grid>
                ) : (
                    <Typography>No se encontraron reservas.</Typography>
                )}
            </Container>
        <Footer />
    </div>
  );
};

export default UserReservationsList;
