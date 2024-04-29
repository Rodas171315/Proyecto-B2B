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


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const navigate = useNavigate(); 

    
    useEffect(() => {
        
        const fetchPaises = async () => {
            try {
                const response = await fetch('http://35.211.214.127:8080/hoteles/pais');
                if (!response.ok) throw new Error('Error al cargar los países');
                const data = await response.json();
                setPaises(data);
            } catch (error) {
                console.error('Error al cargar los países:', error);
                setDialogMessage('Error al cargar los países.');
                setOpenDialog(true);
            }
        };
        fetchPaises();
    }, []);

    const handleBuscarHospedaje = async () => {
        try {
            const response = await fetch(`http://35.211.214.127:8080/hoteles/por-pais/${paisSeleccionado}`);
            if (!response.ok) throw new Error('Error al buscar hoteles');
            const hoteles = await response.json();
    
            if (hoteles.length === 0) {
                setDialogMessage('No se encontraron hoteles disponibles en el país seleccionado.');
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
        const baseURL = 'http://35.211.214.127:8800/vuelos/filtered';
        const queryParams = new URLSearchParams({
            ciudad_origen: origen,
            ciudad_destino: destino,
            fecha_salida: fechaIda
        }).toString();
        const fullURL = `${baseURL}?${queryParams}`;
    
        try {
            const response = await fetch(fullURL);
            if (!response.ok) throw new Error('No se pudieron encontrar vuelos con los criterios proporcionados.');
            const vuelosEncontrados = await response.json();
            
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
            const resPaquetes = await fetch('http://35.211.214.127:8100/paquetes');
            if (!resPaquetes.ok) throw new Error('Network response was not ok for paquetes');
            let paquetesData = await resPaquetes.json();
    
            
            const vuelosRequests = paquetesData.map(paquete =>
                fetch(`http://35.211.214.127:8800/vuelos/${paquete.idVuelo}`)
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
                <Box sx={{ mt: 3 }}>
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
                </Box>
            </TabPanel>
        </Container>
        
    );
};

export default SearchForm;
