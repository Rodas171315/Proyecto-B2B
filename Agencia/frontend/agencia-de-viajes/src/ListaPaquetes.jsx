import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const ListaPaquetes = () => {
  const [paquetes, setPaquetes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
                            <Button size="small" color="primary" onClick={() => eliminarPaquete(paquete.idPaquete)}>
                              Eliminar
                            </Button>

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

