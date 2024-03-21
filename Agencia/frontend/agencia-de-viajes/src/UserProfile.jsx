import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, TextField, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; 
import UserAdministration from './UserAdministration';

const UserProfile = () => {
    const navigate = useNavigate();
    const { user, logout } = useUser(); 

    useEffect(() => {
        if (!user) {
            navigate('/login'); 
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
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
                    <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                </Toolbar>
            </AppBar>
            <Box mt={4}> 
                <UserAdministration />
            </Box>
            {user ? ( 
                <Container component="main" maxWidth="md">
                    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                            Perfil de Usuario
                        </Typography>
                        <Paper elevation={3} sx={{ p: 3, width: '100%', mb: 2 }}>
                            <Grid container spacing={2}>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Correo Electrónico"
                                        value={user.email || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Primer Nombre"
                                        value={user.primer_nombre || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Segundo Nombre"
                                        value={user.segundo_nombre || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Primer Apellido"
                                        value={user.primer_apellido || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Segundo Apellido"
                                        value={user.segundo_apellido || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                
                            </Grid>
                        </Paper>
                    </Box>
                </Container>
                
            ) : (
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                    Cargando información del usuario...
                </Typography>
            )}
        </div>
    );
};

export default UserProfile;

