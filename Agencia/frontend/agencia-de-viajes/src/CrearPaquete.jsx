import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, TextField, Container, Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const CrearPaquete = () => {
  const [hoteles, setHoteles] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [vuelos, setVuelos] = useState([]);
  const [destino, setDestino] = useState('');
  const [hotelSeleccionado, setHotelSeleccionado] = useState(''); 
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState('');
  const [vueloSeleccionado, setVueloSeleccionado] = useState('');
  const [nombrePaquete, setNombrePaquete] = useState('');
  const [descripcionPaquete, setDescripcionPaquete] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (destino) {
      fetch(`http://35.211.214.127:8080/hoteles/por-pais/${destino}`)
        .then(response => response.json())
        .then(data => setHoteles(data))
        .catch(error => console.log(error));

      fetch(`http://35.211.214.127:8800/vuelos/filtered?ciudad_destino=${destino}`)
        .then(response => response.json())
        .then(data => setVuelos(data))
        .catch(error => console.log(error));
    }
  }, [destino]);

  useEffect(() => {
    if (hotelSeleccionado) {
      fetch(`http://35.211.214.127:8080/habitaciones?hotelId=${hotelSeleccionado}`)
        .then(response => response.json())
        .then(data => setHabitaciones(data))
        .catch(error => console.log(error));
    }
  }, [hotelSeleccionado]);

  const translateTipoHabitacion = (tipoHabitacion) => {
    const tipoHabitacionMap = {
      1: "Doble",
      2: "Junior Suite",
      3: "Suite",
      4: "Gran Suite",
    };
    return tipoHabitacionMap[tipoHabitacion] || "Desconocida";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    if (!nombrePaquete) {
      console.error('El nombre del paquete es requerido');
      return; 
    }
    


    const paqueteData = {
      nombrePaquete,
      descripcion: descripcionPaquete,
      idHotel: parseInt(hotelSeleccionado, 10), 
      idHabitacion: parseInt(habitacionSeleccionada, 10), 
      idVuelo: vueloSeleccionado,
      estadoPaquete: "Disponible",
    };
    
  
    console.log('Paquete a crear:', paqueteData);
  
    fetch('http://35.211.214.127:8100/paquetes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paqueteData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Paquete creado:', data);
      setOpenDialog(true); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  

  const handleClose = () => {
    setOpenDialog(false);
    navigate('/lista-paquetes'); 
  };

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="md">
        <Typography component="h1" variant="h5">
          Crear Nuevo Paquete
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
            <Grid item xs={12}>
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
                <InputLabel>Vuelo</InputLabel>
                <Select
                  value={vueloSeleccionado}
                  label="Vuelo"
                  onChange={(e) => setVueloSeleccionado(e.target.value)}
                >
                  {vuelos.map((vuelo) => (
                    <MenuItem key={vuelo._id} value={vuelo._id}>
                      {vuelo.ciudad_origen} - {vuelo.ciudad_destino} (${vuelo.precio})  {vuelo.fecha_salida}
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
            Crear Paquete
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
            Tu paquete ha sido creado con éxito.
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

