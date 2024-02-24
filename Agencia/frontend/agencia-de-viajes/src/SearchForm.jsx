import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, List, ListItem, ListItemText, TextField, Grid, Container, Typography, Tab, Tabs, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const SearchForm = () => {
    const [tabValue, setTabValue] = useState(0);
    const [openDestino, setOpenDestino] = useState(false);
    const [fechaIda, setFechaIda] = useState('');
    const [fechaVuelta, setFechaVuelta] = useState('');
    const [openHuéspedes, setOpenHuéspedes] = useState(false);
    const [adultos, setAdultos] = useState(1);
    const [niños, setNiños] = useState(0);
    const [destino, setDestino] = useState('');
    const [tipoViaje, setTipoViaje] = useState('redondo');
    const [claseVuelo, setClaseVuelo] = useState('economica');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleOpenDestino = () => {
        setOpenDestino(true);
    };

    const handleCloseDestino = () => {
        setOpenDestino(false);
    };

    const handleOpenHuéspedes = () => {
        setOpenHuéspedes(true);
    };

    const handleCloseHuéspedes = () => {
        setOpenHuéspedes(false);
    };

    const navigate = useNavigate(); 

    
    const handleBuscarHospedaje = () => {
        navigate('/hospedajes-disponibles'); 
    };

    const handleBuscarVuelos = () => {
        navigate('/vuelos-disponibles'); 
    };

    return (
        <Container>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Hospedaje" />
                <Tab label="Vuelos" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button onClick={handleOpenDestino} fullWidth>Destino: {destino || 'Selecciona'}</Button>
                            <Dialog onClose={handleCloseDestino} open={openDestino}>
                                <DialogTitle>Elige un destino</DialogTitle>
                                <List>
                                    <ListItem button onClick={() => { setDestino('Cancún, México'); handleCloseDestino(); }}>
                                        <ListItemText primary="Cancún, México" />
                                    </ListItem>
                                    
                                </List>
                            </Dialog>
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
                            <Button onClick={handleOpenHuéspedes} fullWidth>Adultos: {adultos}, Niños: {niños}</Button>
                            <Dialog onClose={handleCloseHuéspedes} open={openHuéspedes}>
                                <DialogTitle>Selecciona el número de huéspedes</DialogTitle>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Adultos" />
                                        <TextField
                                            type="number"
                                            value={adultos}
                                            onChange={(e) => setAdultos(Number(e.target.value))}
                                            InputProps={{ inputProps: { min: 1 } }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Niños" />
                                        <TextField
                                            type="number"
                                            value={niños}
                                            onChange={(e) => setNiños(Number(e.target.value))}
                                            InputProps={{ inputProps: { min: 0 } }}
                                        />
                                    </ListItem>
                                </List>
                                <Button onClick={handleCloseHuéspedes} color="primary">Aceptar</Button>
                            </Dialog>
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" fullWidth onClick={handleBuscarHospedaje}>Buscar Hospedaje</Button>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Origen" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Destino" variant="outlined" />
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
                
                
                <Button variant="contained" color="primary" fullWidth onClick={handleBuscarVuelos}>Buscar Vuelos</Button>
            </TabPanel>
        </Container>
    );
};

export default SearchForm;
