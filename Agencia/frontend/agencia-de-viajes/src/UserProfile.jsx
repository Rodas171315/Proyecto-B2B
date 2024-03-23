import React, { useEffect } from 'react';
import { Typography, Button, Container, Box, TextField, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; 
import UserAdministration from './UserAdministration';
import Header from './Header'; 
import Footer from './Footer'; 

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
            <Header />
            {user && user.rol === 2 && (
                <Box mt={4}> 
                    <UserAdministration />
                </Box>
            )}
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
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleLogout}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Cerrar sesión
                        </Button>
                    </Box>
                </Container>
                
            ) : (
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                    Cargando información del usuario...
                </Typography>
            )}
            <Footer />
        </div>
    );
};

export default UserProfile;

