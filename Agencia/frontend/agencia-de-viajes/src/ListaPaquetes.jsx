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
    fetchPaquetes();
    const intervalId = setInterval(fetchPaquetes, 60000000);  
    return () => clearInterval(intervalId);
  }, []);


    const fetchPaquetes = async () => {
      try {
        const resPaquetes = await fetch('http://localhost:8081/paquetes');
        if (!resPaquetes.ok) throw new Error('Network response was not ok for paquetes');
        let paquetesData = await resPaquetes.json();

        
        paquetesData = await Promise.all(paquetesData.map(async (paquete) => {
          console.log(`Fetching vuelo with ID: ${paquete.idVuelo}`);
          console.log(`Fetching vuelo with ID: ${paquete.idHabitacion}`);
          const [hotelRes, habitacionRes, vueloRes] = await Promise.all([
            fetch(`http://localhost:8080/hoteles/${paquete.idHotel}`),
            fetch(`http://localhost:8080/habitaciones/${paquete.idHabitacion}`),
            fetch(`http://35.211.149.93:8800/vuelos/${paquete.idVuelo}`),
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

    const verificarYCancelarComponentes = async (paquete) => {
      try {
        if (paquete.idReservaHabitacion) {
          const reservaResponse = await fetch(`http://localhost:8080/reservas/${paquete.idReservaHabitacion}`);
          const reserva = await reservaResponse.json();
          if (reserva.estadoReserva === 'Cancelada') {
            await cancelarVuelo(paquete.idBoleto, paquete);
            await cancelarPaquete1(paquete.idPaquete);

            if (paquete.idBoletoVuelta) {
              await cancelarVuelo(paquete.idBoletoVuelta, paquete);
              await cancelarPaquete1(paquete.idPaquete);

            }
          }
        }
    
        if (paquete.idBoleto) {
          const boletoResponse = await fetch(`http://35.211.149.93:8800/boletos/${paquete.idBoleto}`);
          if (!boletoResponse.ok) {
            console.log(`No se encontró vuelo con ID ${paquete.idBoleto}, ya esta cancelado.`);
            return;
          }
          const boleto = await boletoResponse.json();
          if (boleto.estadoReserva === false) {
            await cancelarReserva(paquete.idReservaHabitacion, paquete);
            await cancelarPaquete1(paquete.idPaquete);

          }
        }
    
        if (paquete.idBoletoVuelta) {
          const boletoVueltaResponse = await fetch(`http://35.211.149.93:8800/boletos/${paquete.idBoletoVuelta}`);
          if (!boletoVueltaResponse.ok) {
            console.log(`No se encontró vuelo de retorno con ID ${paquete.idBoletoVuelta}, ya esta cancelado.`);
            return;
          }
          const boletoVuelta = await boletoVueltaResponse.json();
          if (boletoVuelta.estadoReserva === false) {
            await cancelarReserva(paquete.idReservaHabitacion, paquete);
            await cancelarPaquete1(paquete.idPaquete);
          }
        }
      } catch (error) {
        console.error('Error al verificar y cancelar componentes:', error);
      }
    };
    
    const cancelarVuelo = async (idBoleto, paquete) => {
      if (!idBoleto) {
        console.log("El ID del vuelo es nulo o inválido.");
        return;
      }
    
      try {
        const response = await fetch(`http://35.211.149.93:8800/boletos/cancelar/${idBoleto}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (!response.ok) {
          throw new Error(`Error al cancelar el vuelo con ID: ${idBoleto}`);
        }
        enviarEmailCancelacion(paquete, 'Vuelo');
        console.log(`Vuelo con ID ${idBoleto} cancelado exitosamente.`);
      } catch (error) {
        console.error(`Error al cancelar el vuelo con ID ${idBoleto}:`, error);
      }
    };
    
    const cancelarReserva = async (idReserva, paquete) => {
      if (!idReserva) {
        console.log("El ID de la reserva es nulo o inválido.");
        return;
      }
    
      try {
        const response = await fetch(`http://localhost:8080/reservas/${idReserva}/cancelar`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (!response.ok) {
          throw new Error(`Error al cancelar la reserva con ID: ${idReserva}`);
        }
        enviarEmailCancelacion(paquete, 'Reserva');
        console.log(`Reserva con ID ${idReserva} cancelada exitosamente.`);
      } catch (error) {
        console.error(`Error al cancelar la reserva con ID ${idReserva}:`, error);
      }
    };

    const cancelarPaquete1 = async (idPaquete) => {
      try {
        let responsePaquete = await fetch(`http://localhost:8081/paquetes/cancelar/${idPaquete}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estadoPaquete: 'Cancelado' }),
        });
        if (!responsePaquete.ok) throw new Error('No se pudo cancelar el paquete.');
        console.log(`Paquete con ID ${idPaquete} cancelado exitosamente.`);
      } catch (error) {
        console.error(`Error al cancelar el paquete con ID ${idPaquete}:`, error);
      }
    };
    
    
    
    const enviarEmailCancelacion = async (paquete, tipo) => {
      const emailParams = {
        to_name: user.name, 
        to_email: user.email, 
        package_name: paquete.nombrePaquete,
        package_description: paquete.descripcion,
        hotel_name: paquete.hotel,
        room_type: paquete.habitacion,
        room_price: paquete.precioH,
        flight: paquete.vuelo,
        flight_date: paquete.fecha,
        ticket_price: paquete.precioA,
        total_paid: (parseInt(paquete.precioH, 10) + parseInt(paquete.precioA, 10)).toString(),
        type: tipo  
      };
    
      try {
        const result = await emailjs.send('service_mxuy6c7', 'template_jytvzaf', emailParams, 'LergnmYa7Rid--u-g');
        console.log('Correo de confirmación de cancelación enviado exitosamente:', result.text);
      } catch (err) {
        console.error('Error al enviar el correo de confirmación de cancelación:', err);
      }
    };
    
  
  

  const eliminarPaquete = async (idPaquete) => {
    if (idPaquete == null) {
      console.error('El ID del paquete es undefined o null');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8081/paquetes/${idPaquete}`, {
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
        // Primero, obtén el paquete para acceder a los IDs de los boletos
        const paqueteResponse = await fetch(`http://localhost:8081/paquetes/${idPaquete}`);
        const paquete = await paqueteResponse.json();

        // Cancela el paquete
        let responsePaquete = await fetch(`http://localhost:8081/paquetes/cancelar/${idPaquete}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estadoPaquete: 'Cancelado' }),
        });
        if (!responsePaquete.ok) throw new Error('No se pudo cancelar el paquete.');

        // Cancela la reserva de la habitación
        if (paquete.idReservaHabitacion) {
            const responseCancelarReservaHabitacion = await fetch(`http://localhost:8080/reservas/${paquete.idReservaHabitacion}/cancelar`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!responseCancelarReservaHabitacion.ok) {
                throw new Error('No se pudo cancelar la reserva de habitación.');
            }
        }

        // Cancela el boleto de ida
        if (paquete.idBoleto) {
            const responseCancelarBoletoIda = await fetch(`http://35.211.149.93:8800/boletos/cancelar/${paquete.idBoleto}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!responseCancelarBoletoIda.ok) {
                throw new Error('No se pudo cancelar el boleto de ida.');
            }
        }

        // Cancela el boleto de vuelta, si existe
        if (paquete.idBoletoVuelta) {
            const responseCancelarBoletoVuelta = await fetch(`http://35.211.149.93:8800/boletos/cancelar/${paquete.idBoletoVuelta}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!responseCancelarBoletoVuelta.ok) {
                throw new Error('No se pudo cancelar el boleto de vuelta.');
            }
        }

        // Actualiza la lista de paquetes en el estado local para reflejar los cambios
        const updatedPaquetes = paquetes.map(p => p.idPaquete === idPaquete ? { ...p, estadoPaquete: 'Cancelado' } : p);
        setPaquetes(updatedPaquetes);

        const emailParams = {
          to_name: user.name, 
          to_email: user.email, 
          package_name: paquete.nombrePaquete,
          package_description: paquete.descripcion,
          hotel_name: paquete.hotel,
          room_type: paquete.habitacion,
          room_price: paquete.precioH,
          flight: paquete.vuelo,
          flight_date: paquete.fecha,
          ticket_price: paquete.precioA,
          total_paid: (parseInt(paquete.precioH, 10) + parseInt(paquete.precioA, 10)).toString()
      };
      await emailjs.send('service_mxuy6c7', 'template_jytvzaf', emailParams, 'LergnmYa7Rid--u-g')
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



useEffect(() => {
  paquetes.forEach(verificarYCancelarComponentes);
}, [paquetes]);

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
                            {paquete.estadoPaquete === 'Disponible' && user.rol === 2 && (
                              <Button size="small" color="secondary" onClick={() => cancelarPaquete(paquete.idPaquete)}>
                                Cancelar
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
