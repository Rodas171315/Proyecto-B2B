import React, { useState, useEffect } from 'react';
import { Typography, Button, Container, Grid, Card, CardContent, CardActions, CardMedia, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 
import Comentarios from './Comentarios';

const HospedajesDisponibles = () => {
    const [hotelesConHabitaciones, setHotelesConHabitaciones] = useState([]);
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');

    const [tipoHabitacion, setTipoHabitacion] = useState('');
    const [rating, setRating] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [comentariosVisibles, setComentariosVisibles] = useState({});
    

    const tiposHabitacionDisponibles = ["Doble", "Junior Suite", "Suite", "Gran Suite"];
    const ratingsDisponibles = [0, 1, 2, 3, 4, 5];


    const { paisSeleccionado, proveedorSeleccionado } = location.state ? location.state : { paisSeleccionado: '', proveedorSeleccionado: '' };

    console.log("Received state in HospedajesDisponibles:", location.state);

    useEffect(() => {
        if (paisSeleccionado && proveedorSeleccionado) {
            fetchHotelsAndRooms(paisSeleccionado, proveedorSeleccionado);
        }
    }, [location.state]);
    console.log("Received state in HospedajesDisponibles:", location.state);


    const fetchHotelsAndRooms = async (pais, baseUrl) => {
        try {
            console.log("Fetching hotels from URL:", `${baseUrl}/hoteles/por-pais/${pais}`);
            const responseHoteles = await fetch(`${baseUrl}/hoteles/por-pais/${pais}`);
            if (!responseHoteles.ok) throw new Error('Error al cargar hoteles');
            const hoteles = await responseHoteles.json();

            const hotelesConHabitacionesPromesas = hoteles.map(async (hotel) => {
                const respuestaHabitaciones = await fetch(`${baseUrl}/habitaciones?hotelId=${hotel.id_hotel}`);
                if (!respuestaHabitaciones.ok) {
                    console.error(`Error al cargar habitaciones para el hotel: ${hotel.nombre}`);
                    return { ...hotel, habitaciones: [] };
                }
                const habitaciones = await respuestaHabitaciones.json();
                return { ...hotel, habitaciones };
            });

            const hotelesConHabitaciones = await Promise.all(hotelesConHabitacionesPromesas);
            setHotelesConHabitaciones(hotelesConHabitaciones);
        } catch (error) {
            console.error('Error al cargar hoteles y habitaciones:', error);
        }
    };




    const translateTipoHabitacion = (codigo) => {
        const tipoHabitacionMap = {
          1: "Doble",
          2: "Junior Suite",
          3: "Suite",
          4: "Gran Suite",
        };
        return tipoHabitacionMap[codigo] || "Desconocida";
      };
      

    const iniciarCompra = (hotel, habitacion) => {
        console.log("Datos de la habitación:", habitacion);
        console.log("Enviando proveedor a CompraHospedaje:", proveedorSeleccionado);
        navigate('/comprahospedaje', { state: { hotelDetails: hotel, roomDetails: habitacion, proveedorSeleccionado: proveedorSeleccionado } });

    };

    const toggleComentarios = (idHabitacion) => {
        setComentariosVisibles(prevState => {
            const newState = {
                ...prevState,
                [idHabitacion]: !prevState[idHabitacion]
            };
            console.log(newState);
            return newState;
        });
    };
    
    


    const filteredHotelesConHabitaciones = hotelesConHabitaciones
        
        .map(hotel => ({
            ...hotel,
            habitaciones: hotel.habitaciones
                .filter(habitacion => (
                    (!precioMin || habitacion.precioxnoche >= precioMin) &&
                    (!precioMax || habitacion.precioxnoche <= precioMax) &&
                    (!tipoHabitacion || habitacion.tipoHabitacion === tipoHabitacion) &&
                    (!rating || habitacion.valuacion >= rating)
                ))
        }))
        .filter(hotel => hotel.habitaciones.length > 0);

    const resetFilters = () => {
        setPrecioMin('');
        setPrecioMax('');
        setTipoHabitacion('');
        setRating('');
        };

    return (
        <div>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Habitaciones Disponibles
                </Typography>
                
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Precio Mínimo"
                            type="number"
                            variant="outlined"
                            value={precioMin}
                            onChange={(e) => setPrecioMin(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Precio Máximo"
                            type="number"
                            variant="outlined"
                            value={precioMax}
                            onChange={(e) => setPrecioMax(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Tipo de Habitación</InputLabel>
                    <Select
                        value={tipoHabitacion}
                        label="Tipo de Habitación"
                        onChange={(e) => setTipoHabitacion(e.target.value)}
                    >
                        {tiposHabitacionDisponibles.map((tipo) => (
                            <MenuItem key={tipo} value={tipo}>
                                {tipo}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Rating</InputLabel>
                    <Select
                        value={rating}
                        label="Rating"
                        onChange={(e) => setRating(e.target.value)}
                    >
                        {ratingsDisponibles.map((rate) => (
                            <MenuItem key={rate} value={rate}>
                                {rate} Estrellas
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <Button variant="outlined" color="primary" onClick={resetFilters} fullWidth>
                        Restablecer Filtros
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    {filteredHotelesConHabitaciones.map((hotel) =>
                        hotel.habitaciones.map((habitacion, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card>
                                <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://source.unsplash.com/random?hotelRoom&sig=${index}`}
                                        alt={`Habitación ${habitacion.numero_habitacion}`}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {hotel.nombre} - Habitación {habitacion.numero_habitacion}
                                        </Typography>
                                        <Typography>Tipo de Habitación: {translateTipoHabitacion(habitacion.tipo_habitacion)}</Typography>
                                        <Typography>Capacidad: {habitacion.capacidad_personas} personas</Typography>
                                        <Typography>Precio por noche: ${habitacion.precioxnoche}</Typography>
                                        <Typography>Valoración: {habitacion.valuacion} estrellas</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => iniciarCompra(hotel, habitacion)}>
                                            Comprar
                                        </Button>
                                        <Button size="small" onClick={() => toggleComentarios(habitacion.id_habitacion)}>
                                            Ver Comentarios
                                        </Button>
                                    </CardActions>
                                    {comentariosVisibles[habitacion.id_habitacion] && (
                                        console.log("Pasando proveedor a Comentarios:", proveedorSeleccionado),
                                        <Comentarios idHabitacion={habitacion.id_habitacion} proveedorSeleccionado={proveedorSeleccionado} />
                                    )}



                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default HospedajesDisponibles;




