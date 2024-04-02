import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Container, Typography, Tab, Tabs, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
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
    const [idHabitacion, setIdHabitacion] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');






    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const navigate = useNavigate(); 

    
    const handleBuscarHospedaje = async () => {
        
        const idHabitacion = 1; 
        const criteriosBusqueda = {
            idHabitacion,
            fechaIngreso, 
            fechaSalida,
        };
    
        try {
            const response = await fetch('http://localhost:8080/reservas/verificar-disponibilidad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(criteriosBusqueda),
            });
    
            if (!response.ok) throw new Error('Error al verificar la disponibilidad');
            const disponibilidad = await response.json();
    
            if (disponibilidad.disponible) {
                
                alert('Habitación disponible');
            } else {
                setDialogMessage('No hay disponibilidad para las fechas seleccionadas.');
                setOpenDialog(true);
            }
        } catch (error) {
            console.error('Error al verificar la disponibilidad:', error);
            setDialogMessage('Ocurrió un error al verificar la disponibilidad.');
            setOpenDialog(true);
        }
    };
    
    
    const handleBuscarVuelos = async () => {
        const criteriosBusqueda = {
            origen, 
            destino,
            fechaIda,
            fechaVuelta,
            tipoViaje,
            claseVuelo,
        };

        try {
            const response = await fetch('http://localhost:8081/static/vuelos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(criteriosBusqueda),
            });

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
            const response = await fetch('http://localhost:8081/paquetes');
            if (!response.ok) throw new Error('Error al buscar paquetes');
            const paquetesEncontrados = await response.json();
            
            if (paquetesEncontrados.length === 0) {
                console.log('No se encontraron paquetes disponibles.');
            } else {
                navigate('/paquetes-disponibles', { state: { paquetes: paquetesEncontrados } });
            }
        } catch (error) {
            console.error('Error al buscar paquetes:', error);
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
                    <Grid item xs={12}>
                        <TextField
                            label="ID de la Habitación"
                            type="number"
                            fullWidth
                            value={idHabitacion} 
                            onChange={(e) => setIdHabitacion(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha de Ingreso"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={fechaIngreso} 
                            onChange={(e) => setFechaIngreso(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha de Salida"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={fechaSalida} 
                            onChange={(e) => setFechaSalida(e.target.value)}
                        />
                    </Grid>
                </Grid>
                
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>No se encontraron hospedajes</DialogTitle>
                    <DialogContent>
                        <Typography>{dialogMessage}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
                
                <Button variant="contained" color="primary" fullWidth onClick={handleBuscarHospedaje}>
                    Verificar Disponibilidad
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
                                <FormControlLabel value="economica" control={<Radio />} label="Económica" />
                                <FormControlLabel value="ejecutiva" control={<Radio />} label="Ejecutiva" />
                                
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
                    
                    <Button variant="contained" color="primary" onClick={handleBuscarPaquetes}>
                        Buscar Paquetes
                    </Button>
                </Box>
            </TabPanel>
        </Container>
        
    );
};

export default SearchForm;
