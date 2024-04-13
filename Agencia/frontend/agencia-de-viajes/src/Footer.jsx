import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <AppBar position="static" component="footer" sx={{ top: 'auto', bottom: 0, mt: 'auto' }}>
            <Container maxWidth="md">
                <Toolbar sx={{ justifyContent: "center" }}>
                    <Typography variant="h6" component="p" color="inherit">
                        Agencia de Viajes
                    </Typography>
                </Toolbar>
                <Toolbar sx={{ justifyContent: "center" }}>
                    <Typography variant="subtitle1" component="p" color="inherit">
                        Conectando el mundo con las maravillas del viaje.
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Footer;


