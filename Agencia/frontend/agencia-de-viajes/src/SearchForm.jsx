import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, Select, MenuItem, TextField, Grid, Container, Typography, Tab, Tabs, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';


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

const SearchForm = () => {
    const [tabValue, setTabValue] = useState(0);
    const [fechaIda, setFechaIda] = useState('');
    const [fechaVuelta, setFechaVuelta] = useState('');
    const [destino, setDestino] = useState('');
    const [tipoViaje, setTipoViaje] = useState('redondo');
    const [claseVuelo, setClaseVuelo] = useState('economica');
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [origen, setOrigen] = useState('');
    const [paisSeleccionado, setPaisSeleccionado] = useState('');
    const [paises, setPaises] = useState([]);
    const [fechaCheckIn, setFechaCheckIn] = useState('');
    const [fechaCheckOut, setFechaCheckOut] = useState('');
    const [capacidadPersona, setCapacidadPersona] = useState(1);
    const [vuelos, setVuelos] = useState([]);
    const [origenes, setOrigenes] = useState([]);
    const [destinos, setDestinos] = useState([]);
    const [origenSeleccionado, setOrigenSeleccionado] = useState('');
    const [destinoSeleccionado, setDestinoSeleccionado] = useState('');



    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const navigate = useNavigate(); 

    
    useEffect(() => {

        const fetchVuelos = async () => {
            try {
                const response = await fetch('http://35.211.149.93:8800/vuelos');
                if (!response.ok) throw new Error('Error al cargar los vuelos');
                const data = await response.json();
                setVuelos(data);
                const origenesUnicos = [...new Set(data.map(vuelo => vuelo.ciudad_origen))];
                const destinosUnicos = [...new Set(data.map(vuelo => vuelo.ciudad_destino))];
                setOrigenes(origenesUnicos);
                setDestinos(destinosUnicos);
            } catch (error) {
                console.error('Error al cargar los vuelos:', error);
            }
        };
        
        const fetchPaises = async () => {
            try {
                const response = await fetch('http://localhost:8080/hoteles/pais');
                if (!response.ok) throw new Error('Error al cargar los países');
                const data = await response.json();
                setPaises(data);
            } catch (error) {
                console.error('Error al cargar los países:', error);
                setDialogMessage('Error al cargar los países.');
                setOpenDialog(true);
            }
        };
        fetchVuelos();
        fetchPaises();
    }, []);

    const handleBuscarHospedaje = async () => {
        try {
            
            const url = new URL('http://localhost:8080/habitaciones/buscar');
            
            url.searchParams.append('fechaIngreso', fechaCheckIn);
            url.searchParams.append('fechaSalida', fechaCheckOut);
            url.searchParams.append('numeroPersonas', capacidadPersona);
            url.searchParams.append('pais', paisSeleccionado); 
    
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al buscar hospedajes');
            const hoteles = await response.json();
    
            if (hoteles.length === 0) {
                setDialogMessage('No se encontraron hoteles disponibles para las fechas seleccionadas.');
                setOpenDialog(true);
            } else {
                navigate('/hospedajes-disponibles', { state: { paisSeleccionado, hoteles } });
            }
        } catch (error) {
            console.error('Error al buscar hospedaje:', error);
            setDialogMessage('Ocurrió un error al buscar hoteles.');
            setOpenDialog(true);
        }
    };
    
    
    
    const handleBuscarVuelos = async () => {
        try {
            const baseURL = 'http://35.211.149.93:8800/vuelos/filtered';
            let queryParamsIda = new URLSearchParams({
                ciudad_origen: origenSeleccionado,
                ciudad_destino: destinoSeleccionado,
                fecha_salida: fechaIda,
                clase: claseVuelo,
            }).toString();
            const urlIda = `${baseURL}?${queryParamsIda}`;
    
            let vuelosIda = [];
            const responseIda = await fetch(urlIda);
            if (!responseIda.ok) throw new Error('No se pudieron encontrar vuelos de ida.');
            vuelosIda = await responseIda.json();
    
            let vuelosVuelta = [];
            if (tipoViaje === 'redondo') {
                let queryParamsVuelta = new URLSearchParams({
                    ciudad_origen: destinoSeleccionado,
                    ciudad_destino: origenSeleccionado,
                    fecha_salida: fechaVuelta,
                    clase: claseVuelo,
                }).toString();
                const urlVuelta = `${baseURL}?${queryParamsVuelta}`;
    
                const responseVuelta = await fetch(urlVuelta);
                if (!responseVuelta.ok) throw new Error('No se pudieron encontrar vuelos de vuelta.');
                vuelosVuelta = await responseVuelta.json();
            }
    
            const vuelosEncontrados = [...vuelosIda, ...vuelosVuelta];
    
            if (vuelosEncontrados.length === 0) {
                setDialogMessage('No se encontraron vuelos disponibles con los criterios proporcionados.');
                setOpenDialog(true);
            } else {
                navigate('/vuelos-disponibles', { state: { vuelos: vuelosEncontrados } });
            }
        } catch (error) {
            console.error(error);
            setDialogMessage('Ocurrió un error al buscar vuelos.');
            setOpenDialog(true);
        }
    };
    
    
    
    const handleBuscarPaquetes = async () => {
        try {
            const resPaquetes = await fetch('http://localhost:8081/paquetes');
            if (!resPaquetes.ok) throw new Error('Network response was not ok for paquetes');
            let paquetesData = await resPaquetes.json();
    
            
            const vuelosRequests = paquetesData.map(paquete =>
                fetch(`http://35.211.149.93:8800/vuelos/${paquete.idVuelo}`)
            );
            const vuelosResponses = await Promise.all(vuelosRequests);
            const vuelosData = await Promise.all(vuelosResponses.map(res => res.json()));
    
            
            paquetesData.forEach((paquete, index) => {
                paquete.datosVuelo = vuelosData[index];
            });
    
            
            const paquetesFiltrados = paquetesData.filter(paquete =>
                paquete.datosVuelo.ciudad_origen === origen &&
                paquete.datosVuelo.ciudad_destino === destino &&
                new Date(paquete.datosVuelo.fecha_salida) >= new Date(fechaIda) &&
                (tipoViaje === 'sencillo' || new Date(paquete.datosVuelo.fecha_salida) <= new Date(fechaVuelta))
            );
    
            if (paquetesFiltrados.length === 0) {
                setDialogMessage('No se encontraron paquetes disponibles con los criterios proporcionados.');
                setOpenDialog(true);
            } else {
                navigate('/paquetes-disponibles', { state: { paquetes: paquetesFiltrados } });
            }
        } catch (error) {
            console.error('Error al buscar paquetes:', error);
            setDialogMessage('Ocurrió un error al buscar paquetes.');
            setOpenDialog(true);
        }
    };
    
    
    
    return (
        <Container>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Hospedaje" />
                <Tab label="Vuelos" />
                <Tab label="Paquetes" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>País</InputLabel>
                            <Select
                                value={paisSeleccionado}
                                onChange={(e) => setPaisSeleccionado(e.target.value)}
                                label="País"
                            >
                                {paises.map((pais) => (
                                    <MenuItem key={pais} value={pais}>{pais}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                
                <Grid item xs={12} sm={6}>
                <TextField
                    label="Fecha de Check-In"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={fechaCheckIn}
                    onChange={(e) => setFechaCheckIn(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    label="Fecha de Check-Out"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={fechaCheckOut}
                    onChange={(e) => setFechaCheckOut(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    label="Capacidad de Persona"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={capacidadPersona}
                    onChange={(e) => setCapacidadPersona(e.target.value)}
                />
                </Grid>
                </Grid>
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Información</DialogTitle>
                    <DialogContent>
                        <Typography>{dialogMessage}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
                
                <Button variant="contained" color="primary" fullWidth onClick={handleBuscarHospedaje}>
                    Buscar Hoteles
                </Button>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Origen</InputLabel>
                        <Select
                            value={origenSeleccionado}
                            onChange={e => setOrigenSeleccionado(e.target.value)}
                            label="Origen"
                        >
                            {origenes.map(origen => (
                                <MenuItem key={origen} value={origen}>{origen}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Destino</InputLabel>
                        <Select
                            value={destinoSeleccionado}
                            onChange={e => setDestinoSeleccionado(e.target.value)}
                            label="Destino"
                        >
                            {destinos.map(destino => (
                                <MenuItem key={destino} value={destino}>{destino}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha de Ida"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={fechaIda}
                            onChange={(e) => setFechaIda(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha de Vuelta"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={fechaVuelta}
                            onChange={(e) => setFechaVuelta(e.target.value)}
                            disabled={tipoViaje === 'sencillo'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Tipo de Viaje</FormLabel>
                            <RadioGroup
                                row
                                aria-label="tipo de viaje"
                                name="tipo-viaje"
                                value={tipoViaje}
                                onChange={(e) => setTipoViaje(e.target.value)}
                            >
                                <FormControlLabel value="sencillo" control={<Radio />} label="Sencillo" />
                                <FormControlLabel value="redondo" control={<Radio />} label="Redondo" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Clase</FormLabel>
                            <RadioGroup
                                row
                                aria-label="clase"
                                name="clase-vuelo"
                                value={claseVuelo}
                                onChange={(e) => setClaseVuelo(e.target.value)}
                            >
                                <FormControlLabel value="economica" control={<Radio />} label="Turista" />
                                <FormControlLabel value="ejecutiva" control={<Radio />} label="Ejecutivo" />
                                
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    </Grid>
                        
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>No se encontraron vuelos</DialogTitle>
                    <DialogContent>
                        <Typography>{dialogMessage}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cerrar</Button>
                    </DialogActions>
                </Dialog>

                <Button variant="contained" color="primary" fullWidth onClick={handleBuscarVuelos}>Buscar Vuelos</Button>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate('/crear-paquete')}>
                Reservar Paquete
            </Button>
                {/* <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        label="Origen" 
                        variant="outlined"
                        value={origen}
                        onChange={(e) => setOrigen(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        label="Destino" 
                        variant="outlined"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)} />
                </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha de Ida"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={fechaIda}
                            onChange={(e) => setFechaIda(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha de Vuelta"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={fechaVuelta}
                            onChange={(e) => setFechaVuelta(e.target.value)}
                            disabled={tipoViaje === 'sencillo'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Tipo de Viaje</FormLabel>
                            <RadioGroup
                                row
                                aria-label="tipo de viaje"
                                name="tipo-viaje"
                                value={tipoViaje}
                                onChange={(e) => setTipoViaje(e.target.value)}
                            >
                                <FormControlLabel value="sencillo" control={<Radio />} label="Sencillo" />
                                <FormControlLabel value="redondo" control={<Radio />} label="Redondo" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Clase</FormLabel>
                            <RadioGroup
                                row
                                aria-label="clase"
                                name="clase-vuelo"
                                value={claseVuelo}
                                onChange={(e) => setClaseVuelo(e.target.value)}
                            >
                                <FormControlLabel value="economica" control={<Radio />} label="Turista" />
                                <FormControlLabel value="ejecutiva" control={<Radio />} label="Ejecutivo" />
                                
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                    <TextField
                        label="Numero de Pasajeros"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={capacidadPersona}
                        onChange={(e) => setCapacidadPersona(e.target.value)}
                    />
                    </Grid>
                    </Grid>
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>Información</DialogTitle>
                        <DialogContent>
                            <Typography>{dialogMessage}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)}>Cerrar</Button>
                        </DialogActions>
                    </Dialog>

                    <Button variant="contained" color="primary" onClick={handleBuscarPaquetes}>
                        Buscar Paquetes
                    </Button>
                </Box>*/}
            </TabPanel>
        </Container>
        
    );
};

export default SearchForm;
