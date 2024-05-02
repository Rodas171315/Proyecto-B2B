import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button, Tab, Tabs, Box } from '@mui/material';
import { useUser } from './UserContext';
import Header from './Header'; 
import Footer from './Footer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
          {value === index && (
              <Box sx={{ p: 3 }}>
                  <Typography>{children}</Typography>
              </Box>
          )}
      </div>
  );
}

const UserReservationsList = () => {
    const [reservations, setReservations] = useState([]);
    const [flightReservations, setFlightReservations] = useState([]);
    const [packages, setPackages] = useState([]);
    const { user } = useUser();
    const [tabValue, setTabValue] = useState(0);


    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
  };
    useEffect(() => {
      if (user) {
        fetchReservations();
        fetchFlightReservations();
        fetchPackages();
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

    const fetchFlightReservations = () => {
      const storedReservations = localStorage.getItem('reservasVuelosAgencia');
      if (storedReservations) {
        const reservations = JSON.parse(storedReservations);
        
        const userFlightReservations = reservations.filter(reservation => reservation.usuarioId === user.id);
        console.log("Reservas de vuelo encontradas:", userFlightReservations);
        setFlightReservations(userFlightReservations);
      } else {
        console.log("No hay reservas de vuelos almacenadas en localStorage.");
      }
    };
    
    const fetchPackages = async () => {
      try {
          const resPaquetes = await fetch(process.env.REACT_APP_BACKEND_URL + '/paquetes');
          if (!resPaquetes.ok) throw new Error('Network response was not ok for paquetes');
          let paquetesData = await resPaquetes.json();

          paquetesData = paquetesData.filter(paquete => paquete.idUsuario === user.id);

          const detailedPackages = await Promise.all(paquetesData.map(async (paquete) => {
              const [hotelRes, habitacionRes, vueloRes] = await Promise.all([
                  fetch(`http://localhost:8080/hoteles/${paquete.idHotel}`),
                  fetch(`http://localhost:8080/habitaciones/${paquete.idHabitacion}`),
                  fetch(process.env.REACT_APP_AIRLINE_BACKEND_URL + `/vuelos/${paquete.idVuelo}`),
              ]);
          
              const hotel = await hotelRes.json();
              const habitacion = await habitacionRes.json();
              const vuelo = await vueloRes.json();
              
              return {
                  ...paquete,
                  hotel: hotel.nombre, 
                  habitacion: habitacion.tipo_habitacion, 
                  precioH: habitacion.precioxnoche,
                  vuelo: `${vuelo.ciudad_origen} a ${vuelo.ciudad_destino}`,
                  precioA: vuelo.precio,
                  fecha: vuelo.fecha_salida,
              };
          }));
          
          setPackages(detailedPackages);
      } catch (error) {
          console.error('Error al obtener los paquetes:', error);
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

    const downloadReservationPdf = (reservation) => {
      const doc = new jsPDF();
      doc.text("Detalle de Reserva", 14, 16);
      doc.setFontSize(10);

      const reservationDetails = [
        ["Hotel", reservation.nombreHotel],
        ["Tipo de Habitación", translateTipoHabitacion(reservation.tipoHabitacion)],
        ["Check-in", reservation.fechaIngreso],
        ["Check-out", reservation.fechaSalida],
        ["Noches", calculateNights(reservation.fechaIngreso, reservation.fechaSalida).toString()],
        ["Total", `$${reservation.totalReserva}`],
        ["Estado", reservation.estadoReserva],
        ["Código de reserva", reservation.codigoReserva ],
      ];

      doc.autoTable({
        head: [['Detalle', 'Información']],
        body: reservationDetails,
        startY: 22,
      });

      doc.save(`Reserva_${reservation.idReserva}.pdf`);
    };


    const downloadFlightReservationPdf = (reservation) => {
      
      if (!reservation.detallesVuelo) {
        console.error('Detalles de vuelo no definidos para esta reserva:', reservation);
        return; 
      }
    
      const doc = new jsPDF();
      doc.text("Detalle de Reserva de Vuelo", 14, 16);
      doc.setFontSize(10);
    
     
      const flightDetails = [
        ["Origen", reservation.detallesVuelo.origen],
        ["Destino", reservation.detallesVuelo.destino],
        ["Fecha y Hora", new Date(reservation.detallesVuelo.fechaSalida).toLocaleString()],
        ["Precio", `$${reservation.detallesVuelo.precio}`],
        ["Tipo de Asiento", reservation.tipoAsiento],
        ["Cantidad", reservation.cantidad.toString()],
      ];
    
      doc.autoTable({
        head: [['Detalle', 'Información']],
        body: flightDetails,
        startY: 22,
      });
    
      doc.save(`ReservaVuelo_${new Date().getTime()}.pdf`);
    };
    
    const downloadPackagePdf = (paquete) => {
      const doc = new jsPDF();
      doc.text("Detalle del Paquete", 14, 16);
      doc.setFontSize(10);
  
      const packageDetails = [
          ["Nombre del Paquete", paquete.nombrePaquete],
          ["Descripción", paquete.descripcion],
          ["Hotel", paquete.hotel],
          ["Habitación", `${paquete.habitacion}, $${paquete.precioH} por noche`],
          ["Vuelo", `${paquete.vuelo}, $${paquete.precioA}`],
          ["Fecha de Salida del Vuelo", new Date(paquete.fecha).toLocaleDateString()],
          ["Precio Total del Paquete", `$${parseInt(paquete.precioH, 10) + parseInt(paquete.precioA, 10)}`],
          ["Estado del Paquete", paquete.estadoPaquete],
      ];
  
      doc.autoTable({
          head: [['Detalle', 'Descripción']],
          body: packageDetails,
          startY: 22,
      });
  
      doc.save(`Paquete_${paquete.id}.pdf`);
  };
  

    return (
      <div>
          <Header />
          <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Hospedaje" />
                <Tab label="Vuelos" />
                <Tab label="Paquetes" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <Container maxWidth="md">
                  <Typography variant="h4" gutterBottom>
                      Historial de Reservas de Hospedajes
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
                              <Button onClick={() => downloadReservationPdf(reservation)}>
                                  Descargar Reserva
                              </Button>
                              </CardContent>
                          </Card>
                          </Grid>
                      ))}
                      </Grid>
                  ) : (
                      <Typography>No se encontraron reservas.</Typography>
                  )}
              </Container>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
              <Container maxWidth="md">
                <Typography variant="h4" gutterBottom>
                  Historial de Reservas de Vuelos
                </Typography>
                {flightReservations.length > 0 ? (
                  <Grid container spacing={4}>
                    {flightReservations.map((reservation, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={`https://source.unsplash.com/random?flight&sig=${index}`}
                            alt="Imagen de vuelo"
                          />
                          <CardContent>
                            {reservation.detallesVuelo ? (
                              <>
                                <Typography variant="h6">
                                  {reservation.detallesVuelo.origen} - {reservation.detallesVuelo.destino}
                                </Typography>
                                <Typography color="textSecondary">
                                  Fecha y Hora: {new Date(reservation.detallesVuelo.fechaSalida).toLocaleString()}
                                </Typography>
                                <Typography color="textSecondary">
                                  Precio: ${reservation.detallesVuelo.precio}
                                </Typography>
                                <Button onClick={() => downloadFlightReservationPdf(reservation)}>
                                  Descargar Reserva
                                </Button>
                              </>
                            ) : (
                              <Typography variant="body2" color="error">
                                Detalle de vuelo no disponible.
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography>No se encontraron reservas de vuelos.</Typography>
                )}
              </Container>
              </TabPanel>
              <TabPanel value={tabValue} index={2}> 
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom>
                    Paquetes Comprados
                </Typography>
                {packages.length > 0 ? (
                    <Grid container spacing={4}>
                        {packages.map((paquete, index) => (
                            <Grid item xs={12} sm={6} md={4} key={paquete.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://source.unsplash.com/random?flight&sig=${index}`}
                                        alt="Paquete"
                                    />
                                    <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {paquete.nombrePaquete}
                                    </Typography>
                                    <Typography>
                                        Hotel: {paquete.hotel}
                                    </Typography>
                                    <Typography>
                                        Habitación: {paquete.habitacion}
                                    </Typography>
                                    <Typography>
                                        Precio por Noche: ${paquete.precioH}
                                    </Typography>
                                    <Typography>
                                        Vuelo: {paquete.vuelo}
                                    </Typography>
                                    <Typography>
                                        Descripcion: {paquete.descripcion}
                                    </Typography>
                                    <Typography>
                                        Estado del paquete: {paquete.estadoPaquete}
                                    </Typography>
                                    <Typography>
                                        Precio de vuelo: ${paquete.precioA}
                                    </Typography>
                                    <Typography>
                                        Fecha Salida: {paquete.fecha}
                                    </Typography>
                                    <Button onClick={() => downloadPackagePdf(paquete)}>
                                        Descargar Detalles del Paquete
                                    </Button>
                                </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography>No se encontraron paquetes comprados.</Typography>
                )}
            </Container>
        </TabPanel>
        <Footer />
      </div>
    );
};

export default UserReservationsList;

