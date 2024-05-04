import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, TextField, Container, Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { useUser } from './UserContext';

const CrearPaquete = () => {
  const { user } = useUser();
  const [hoteles, setHoteles] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [vuelosIda, setVuelosIda] = useState([]);
  const [vuelosVuelta, setVuelosVuelta] = useState([]);
  const [destino, setDestino] = useState('');
  const [origen, setOrigen] = useState('');
  const [hotelSeleccionado, setHotelSeleccionado] = useState(''); 
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState('');
  const [vueloIdaSeleccionado, setVueloIdaSeleccionado] = useState('');
  const [vueloVueltaSeleccionado, setVueloVueltaSeleccionado] = useState('');
  const [fechaIda, setFechaIda] = useState('');
  const [fechaVuelta, setFechaVuelta] = useState('');
  const [nombrePaquete, setNombrePaquete] = useState('');
  const [descripcionPaquete, setDescripcionPaquete] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (destino) {
      fetch(`http://localhost:8080/hoteles/por-pais/${destino}`)
        .then(response => response.json())
        .then(data => setHoteles(data))
        .catch(error => console.log(error));

      if (origen && destino && fechaIda && fechaVuelta) {
        const fetchVuelos = async () => {
          const responseIda = await fetch(`http://35.211.149.93:8800/vuelos/filtered?ciudad_origen=${origen}&ciudad_destino=${destino}&fecha_salida=${fechaIda}`);
          const responseVuelta = await fetch(`http://35.211.149.93:8800/vuelos/filtered?ciudad_origen=${destino}&ciudad_destino=${origen}&fecha_salida=${fechaVuelta}`);
          const vuelosIda = await responseIda.json();
          const vuelosVuelta = await responseVuelta.json();
          setVuelosIda(vuelosIda);
          setVuelosVuelta(vuelosVuelta);
        };
        fetchVuelos();
      }
    }
  }, [origen, destino, fechaIda, fechaVuelta]);

  useEffect(() => {
    if (destino && fechaIda && fechaVuelta ) {
      const url = new URL('http://localhost:8080/habitaciones/buscar');
      url.searchParams.append('pais', destino);
      url.searchParams.append('fechaIngreso', fechaIda);
      url.searchParams.append('fechaSalida', fechaVuelta);
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setHabitaciones(data);
          } else {
            console.log('No se encontraron habitaciones disponibles.');
          }
        })
        .catch(error => console.error('Error al cargar habitaciones:', error));
    }
  }, [destino, fechaIda, fechaVuelta]); 
  
  const translateTipoHabitacion = (tipoHabitacion) => {
    const tipoHabitacionMap = {
      1: "Doble",
      2: "Junior Suite",
      3: "Suite",
      4: "Gran Suite",
    };
    return tipoHabitacionMap[tipoHabitacion] || "Desconocida";
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombrePaquete) {
        console.error('El nombre del paquete es requerido');
        return;
    }

    try {
        const habitacion = habitaciones.find(h => h.id_habitacion === habitacionSeleccionada);
        if (!habitacion) {
            console.error('No se encontró la habitación seleccionada');
            alert('La habitación seleccionada no está disponible. Por favor, selecciona otra.');
            return;
        }

        const capacidadPersonas = habitacion.capacidad_personas;

        
        const idBoletoIda = await realizarCompraBoleto(vueloIdaSeleccionado, 'turista', 1, fechaIda);
        if (!idBoletoIda) {
            console.error('No se pudo obtener el ID del boleto de ida.');
            alert('No se pudo completar la compra del boleto de ida correctamente.');
            return;
        }

        
        let idBoletoVuelta = null;
        if (vueloVueltaSeleccionado) {
            idBoletoVuelta = await realizarCompraBoleto(vueloVueltaSeleccionado, 'turista', 1, fechaVuelta);
            if (!idBoletoVuelta) {
                console.error('No se pudo obtener el ID del boleto de vuelta.');
                alert('No se pudo completar la compra del boleto de vuelta correctamente.');
                return;
            }
        }


        const precioPorNoche = habitacion.precioxnoche;
        const fechaInicio = new Date(fechaIda);
        const fechaFin = new Date(fechaVuelta);
        const diferenciaTiempo = fechaFin.getTime() - fechaInicio.getTime();
        const noches = diferenciaTiempo / (1000 * 3600 * 24);

        const totalReserva = precioPorNoche * noches;

        const idReservaHabitacion = await realizarReservaHabitacion(
            habitacionSeleccionada,
            fechaIda,
            fechaVuelta,
            habitacion.capacidad_personas,
            totalReserva
        );
        if (!idReservaHabitacion) {
            console.error('No se pudo obtener un ID válido para la reserva de la habitación.');
            alert('No se pudo crear la reserva de la habitación correctamente.');
            return;
        }

        
        const paqueteData = {
            nombrePaquete,
            descripcion: descripcionPaquete,
            idHotel: parseInt(hotelSeleccionado, 10),
            idHabitacion: parseInt(habitacionSeleccionada, 10),
            idVuelo: vueloIdaSeleccionado,
            idVueloVuelta: vueloVueltaSeleccionado,
            idUsuario: user.id,
            idReservaHabitacion,
            idBoleto: idBoletoIda,
            idBoletoVuelta,
            estadoPaquete: "Disponible",
        };

        const response = await fetch('http://localhost:8081/paquetes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paqueteData),
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Error al crear el paquete:', errorDetails);
            throw new Error('No se pudo crear el paquete: ' + errorDetails);
        }

        const paqueteCreado = await response.json();
        console.log('Paquete creado con éxito:', paqueteCreado);
        setOpenDialog(true);
    } catch (error) {
        console.error('Error al procesar la creación del paquete:', error);
        alert('Hubo un error al procesar tu compra. Por favor, intenta nuevamente.');
    }
};



async function realizarCompraBoleto(vueloId, tipoAsiento, cantidad, fecha) {
  const response = await fetch('http://35.211.149.93:8800/boletos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuarioId: '6610fa0f69bd0f1affec1601', vueloId, tipoAsiento, cantidad }),
  });

  if (!response.ok) {
      
      const responseText = await response.text();
      try {
          const errorDetails = JSON.parse(responseText);
          throw new Error(`No se pudo completar la compra del boleto: ${errorDetails.message}`);
      } catch {
          throw new Error('Error en la respuesta del servidor: ' + responseText);
      }
  }

  const responseData = await response.json();
  const ticketId = responseData[0]._id; 
  console.log("ID del boleto obtenido:", ticketId);
  return ticketId;
}


async function realizarReservaHabitacion(habitacionId, fechaIngreso, fechaSalida, personasReserva, totalReserva) {
  const codigoReserva = Math.floor(Math.random() * 1000000).toString();

  const response = await fetch('http://localhost:8080/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idHotel: parseInt(hotelSeleccionado, 10),
      idHabitacion: habitacionId,
      fechaIngreso,
      fechaSalida,
      idUsuario: user.id,
      codigoReserva: codigoReserva,
      personasReserva: personasReserva,
      totalReserva
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Reserva creada con éxito:', data);
    return data.idReserva; 
  } else {
    const errorResponse = await response.text();  
    console.error('Error en la creación de la reserva:', errorResponse);
    alert('Error en la creación de la reserva: ' + errorResponse);
    return null;
  }
}





  const handleClose = () => {
    setOpenDialog(false);
    navigate('/reservations');
  };

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="md">
        <Typography component="h1" variant="h5">
          Reservar un Paquete
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nombrePaquete"
                label="Nombre del Paquete"
                name="nombrePaquete"
                value={nombrePaquete}
                onChange={(e) => setNombrePaquete(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="descripcionPaquete"
                label="Descripción del Paquete"
                name="descripcionPaquete"
                value={descripcionPaquete}
                onChange={(e) => setDescripcionPaquete(e.target.value)}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Origen"
                type="text"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="destino"
                label="Destino"
                name="destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Fecha de Ida"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={fechaIda}
                onChange={(e) => setFechaIda(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Fecha de Vuelta"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={fechaVuelta}
                onChange={(e) => setFechaVuelta(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Hotel</InputLabel>
                <Select
                value={hotelSeleccionado}
                label="Hotel"
                onChange={(e) => setHotelSeleccionado(e.target.value)}
                >
                {hoteles.filter(hotel => hotel && hotel.id_hotel).map((hotel) => (
                <MenuItem key={hotel.id_hotel} value={hotel.id_hotel.toString()}>
                    {hotel.nombre}
                </MenuItem>
                ))}

                </Select>
            </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Habitación</InputLabel>
                <Select
                  value={habitacionSeleccionada}
                  label="Habitación"
                  onChange={(e) => setHabitacionSeleccionada(e.target.value)}
                  disabled={!hotelSeleccionado}
                >
                  {habitaciones.map((habitacion) => (
                    <MenuItem key={habitacion.id_habitacion} value={habitacion.id_habitacion}>
                      Tipo: {translateTipoHabitacion(habitacion.tipo_habitacion)} - Precio:${habitacion.precioxnoche} - Personas:{habitacion.capacidad_personas}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Vuelo Ida</InputLabel>
                <Select
                  value={vueloIdaSeleccionado}
                  onChange={(e) => setVueloIdaSeleccionado(e.target.value)}
                >
                  {vuelosIda.map((vuelo) => (
                    <MenuItem key={vuelo._id} value={vuelo._id}>
                      {vuelo.ciudad_origen} - {vuelo.ciudad_destino} (${vuelo.precio}) {vuelo.fecha_salida}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Vuelo Vuelta</InputLabel>
                <Select
                  value={vueloVueltaSeleccionado}
                  onChange={(e) => setVueloVueltaSeleccionado(e.target.value)}
                >
                  {vuelosVuelta.map((vuelo) => (
                    <MenuItem key={vuelo._id} value={vuelo._id}>
                      {vuelo.ciudad_origen} - {vuelo.ciudad_destino} (${vuelo.precio}) {vuelo.fecha_salida}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Reservar Paquete
          </Button>
        </form>
      </Container>
      <Footer />
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Paquete Creado"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tu paquete ha sido reservado con éxito.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ver lista de paquetes
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default CrearPaquete;

