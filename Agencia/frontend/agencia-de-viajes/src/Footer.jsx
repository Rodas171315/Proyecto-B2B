import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
    const logoUrl = 'https://source.unsplash.com/random/100x50?sig=logo';

    return (
        <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box component="img" sx={{ height: 50, mb: 2 }} src={logoUrl} alt="Logo" />
                        <Typography variant="subtitle1" color="white">Agencia de Viajes Explora</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Contacto</Typography>
                        <Typography variant="body2">Teléfono de servicio al cliente: (+502) 2356-7800</Typography>
                        <Typography variant="body2">Dirección: 1 Avenida 12-47, Zona 10 Guatemala, City 01010</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Legal</Typography>
                        <Link href="#terms" color="inherit" sx={{ textDecoration: 'none', color: 'white' }}>Términos de Servicio</Link><br/>
                        <Link href="#privacy" color="inherit" sx={{ textDecoration: 'none', color: 'white' }}>Política de Privacidad</Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Síguenos</Typography>
                        <Link href="#facebook" color="inherit" sx={{ textDecoration: 'none', color: 'white' }}>Facebook</Link><br/>
                        <Link href="#twitter" color="inherit" sx={{ textDecoration: 'none', color: 'white' }}>Twitter</Link><br/>
                        <Link href="#instagram" color="inherit" sx={{ textDecoration: 'none', color: 'white' }}>Instagram</Link>
                    </Grid>
                </Grid>
                <Typography variant="body2" color="white" align="center" sx={{ pt: 4 }}>
                    © {new Date().getFullYear()} Agencia de Viajes Explora. Todos los derechos reservados.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;




