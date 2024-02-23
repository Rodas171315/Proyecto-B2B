import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, TextField, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserAdministration from './UserAdministration';

const UserProfile = () => {
    const navigate = useNavigate();

    
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [bio, setBio] = useState('Amante de los viajes y la aventura.');

    const handleSave = () => {
        // Lógica para guardar los cambios
        alert('Perfil actualizado');
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Agencia de Viajes
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/')}>Inicio</Button>
                    <Button color="inherit" onClick={() => navigate('/aboutus')}>Acerca de Nosotros</Button>
                </Toolbar>
            </AppBar>
            
            <Container component="main" maxWidth="md">
                <Box sx={{ mt: 8, mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h4">
                        Perfil de Usuario
                    </Typography>
                    <Paper elevation={3} sx={{ mt: 3, mb: 3, p: 3, width: '100%' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Correo Electrónico"
                                    value={email}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Biografía"
                                    multiline
                                    rows={4}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={handleSave}>
                                    Guardar Cambios
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
            <Box mt={4}> 
                <UserAdministration />
            </Box>
            <footer style={{ marginTop: '20px', padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
                <Typography variant="h6">Agencia de Viajes</Typography>
                <Typography variant="subtitle1">
                    Conectando el mundo con las maravillas del viaje.
                </Typography>
            </footer>
        </div>
    );
};

export default UserProfile;
