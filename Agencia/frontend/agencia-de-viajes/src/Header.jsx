import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Agencia de Viajes
                </Typography>
                <Button color="inherit" onClick={() => navigate('/')}>Inicio</Button>
                <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                <Button color="inherit" onClick={() => navigate('/register')}>Registrarse</Button>
                <Button color="inherit" onClick={() => navigate('/aboutus')}>Acerca de Nosotros</Button>
                <Button color="inherit" onClick={() => navigate('/userprofile')}>Perfil</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
