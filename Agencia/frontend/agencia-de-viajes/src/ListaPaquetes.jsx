import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { useUser } from './UserContext';


const ListaPaquetes = () => {
  const [paquetes, setPaquetes] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchPaquetes = async () => {
      try {
        const resPaquetes = await fetch('http://35.211.214.127:8100/paquetes');
        if (!resPaquetes.ok) throw new Error('Network response was not ok for paquetes');
        let paquetesData = await resPaquetes.json();

        
        paquetesData = await Promise.all(paquetesData.map(async (paquete) => {
          console.log(`Fetching vuelo with ID: ${paquete.idVuelo}`);
          console.log(`Fetching vuelo with ID: ${paquete.idHabitacion}`);
          const [hotelRes, habitacionRes, vueloRes] = await Promise.all([
            fetch(`http://35.211.214.127:8080/hoteles/${paquete.idHotel}`),
            fetch(`http://35.211.214.127:8080/habitaciones/${paquete.idHabitacion}`),
            fetch(`http://35.211.214.127:8800/vuelos/${paquete.idVuelo}`),
          ]);
        
          const hotel = await hotelRes.json();
          const habitacion = await habitacionRes.json();
          console.log(`Received habitacion data:`, habitacionRes);
          const vuelo = await vueloRes.json();
          console.log(`Received vuelo data:`, vuelo);
           
          return {
            ...paquete,
            hotel: hotel.nombre, 
            habitacion: habitacion.tipo_habitacion, 
            precioH: habitacion.precioxnoche,
            capacidad: habitacion.capacidad_personas,
            vuelo: `${vuelo.ciudad_origen} a ${vuelo.ciudad_destino}`,
            precioA: vuelo.precio,
            fecha: vuelo.fecha_salida,
          };
        }));
        

        setPaquetes(paquetesData);
      } catch (error) {
        console.error('Error al obtener los paquetes:', error);
      }
    };

    fetchPaquetes();
  }, []);

  const eliminarPaquete = async (idPaquete) => {
    if (idPaquete == null) {
      console.error('El ID del paquete es undefined o null');
      return;
    }
  
    try {
      const response = await fetch(`http://35.211.214.127:8100/paquetes/${idPaquete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setPaquetes(paquetes.filter(paquete => paquete.idPaquete !== idPaquete));
    } catch (error) {
      console.error('Error al eliminar el paquete:', error);
    }
  };
  
  const cancelarPaquete = async (idPaquete) => {
    try {
        
        let response = await fetch(`http://35.211.214.127:8100/paquetes/cancelar/${idPaquete}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estadoPaquete: 'Cancelado' }),
        });
        if (!response.ok) throw new Error('No se pudo cancelar el paquete.');

        
        const paqueteActualizado = paquetes.find(p => p.idPaquete === idPaquete);
        if (!paqueteActualizado) throw new Error('Paquete no encontrado');

        
        if (paqueteActualizado.idReservaHabitacion) {
          const responseCancelarReservaHabitacion = await fetch(`http://35.211.214.127:8080/reservas/${paqueteActualizado.idReservaHabitacion}/cancelar`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        
          if (!responseCancelarReservaHabitacion.ok) {
            throw new Error('No se pudo cancelar la reserva de habitación.');
          }
        }
        if (!response.ok) throw new Error('No se pudo cancelar la reserva de hospedaje.');

        
        response = await fetch(`http://35.211.214.127:8800/boletos/cancelar/${paqueteActualizado.idBoleto}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('No se pudo cancelar la reserva de vuelo.');

        
        const updatedPaquetes = paquetes.map(p => p.idPaquete === idPaquete ? { ...p, estadoPaquete: 'Cancelado' } : p);
        setPaquetes(updatedPaquetes);

        const emailParams = {
          to_name: user.name, 
          to_email: user.email, 
          package_name: paqueteActualizado.nombrePaquete,
          package_description: paqueteActualizado.descripcion,
          hotel_name: paqueteActualizado.hotel,
          room_type: paqueteActualizado.habitacion,
          room_price: paqueteActualizado.precioH,
          flight: paqueteActualizado.vuelo,
          flight_date: paqueteActualizado.fecha,
          ticket_price: paqueteActualizado.precioA,
          total_paid: (parseInt(paqueteActualizado.precioH, 10) + parseInt(paqueteActualizado.precioA, 10)).toString()
      };
      await emailjs.send('service_521uswb', 'template_8uqs7l7', emailParams, 'BaaC73U6PfMwmi5uk')
          .then((response) => {
              console.log('Email sent successfully', response.status, response.text);
              alert('Paquete cancelado y correo de confirmación enviado.');
          }, (err) => {
              console.log('Failed to send email. Error: ', err);
          });

        alert('Paquete y reservas asociadas canceladas con éxito.');
    } catch (error) {
        console.error('Error al cancelar el paquete y enviar correo:', error);
        alert('Error al cancelar el paquete. Por favor, intenta de nuevo.');
    }
};

  

  return (
    <div>
        <Header />
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Lista de Paquetes
            </Typography>
            <Grid container spacing={4}>
                {paquetes.map((paquete, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://source.unsplash.com/random?city&sig=${index}`}
                                alt="Imagen de ciudad"
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
                                Capacidad: {paquete.capacidad}
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
                            </CardContent>
                            <CardActions>
                            {user.rol === 2 &&(
                            <Button size="small" color="primary" onClick={() => eliminarPaquete(paquete.idPaquete)}>
                              Eliminar
                            </Button>
                            )}
                            {paquete.estadoPaquete === 'Comprado' && user.rol === 2 && (
                              <Button size="small" color="secondary" onClick={() => cancelarPaquete(paquete.idPaquete)}>
                                Cancelar
                              </Button>
                            )}
                            {paquete.estadoPaquete === 'Disponible' && (
                                        <Button size="small" onClick={() => navigate('/compra-paquete', { state: { paquete } })}>
                                            Comprar
                                        </Button>
                                    )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate('/crear-paquete')}>
                Crear Paquete
            </Button>
        </Container>
        <Footer />
    </div>
  );
};

export default ListaPaquetes;

