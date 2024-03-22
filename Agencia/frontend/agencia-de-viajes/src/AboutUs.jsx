import React from 'react';
import { Container, Typography, Box, Paper, Grid, Card, CardContent} from '@mui/material';
import Header from './Header'; 
import Footer from './Footer'; 

const AboutUs = () => {
    

    return (
        <div>
            <Header />
        <Container component="main" maxWidth="md">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ padding: 2,  marginBottom: 4, width: '100%' }}>
                    <Typography component="h1" variant="h4" gutterBottom>
                        Sobre Nosotros
                    </Typography>
                    <Typography paragraph>
                        Somos una agencia de viajes comprometida con brindar experiencias inolvidables a nuestros clientes. Nuestra dedicación a la excelencia y nuestra pasión por explorar nuevos destinos nos convierte en tu mejor aliado para descubrir el mundo.
                    </Typography>
                </Paper>
                <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ padding: 2, marginBottom: 4, width: '100%' }}>
                                <Typography component="h2" variant="h5" gutterBottom>
                                    Misión
                                </Typography>
                                <Typography paragraph>
                                    Nuestra misión es hacer accesibles los viajes de ensueño para todos, ofreciendo paquetes ajustados a diversas necesidades y presupuestos, sin comprometer la calidad y la experiencia completa de viajar.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ padding: 2, marginBottom: 4, width: '100%' }}>
                                <Typography component="h2" variant="h5" gutterBottom>
                                    Visión
                                </Typography>
                                <Typography paragraph>
                                    Aspiramos a ser líderes en la industria de viajes, reconocidos por nuestra innovación, servicio al cliente y por ser pioneros en ofrecer destinos emergentes y experiencias de viaje únicas.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                <Paper elevation={3} sx={{ padding: 2,  marginBottom: 4, width: '100%' }}>
                    <Typography component="h2" variant="h5" gutterBottom>
                        Valores
                    </Typography>
                    <Grid container spacing={2}>
                        {['Pasión por viajar', 'Integridad', 'Excelencia en el servicio', 'Innovación', 'Responsabilidad', 'Confianza'].map((value, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper elevation={2} sx={{ padding: 2, height: '100%' }}>
                                    <Typography variant="body1">{value}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Box>
            {/* Testimonios de Clientes */}
            <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Testimonios
                    </Typography>
                    <Grid container spacing={4}>
                        {/* Ejemplo de un testimonio */}
                        <Grid item xs={12} md={4}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography paragraph>
                                        "¡Una experiencia inolvidable! El servicio al cliente fue excepcional y todo estuvo perfectamente organizado. ¡No puedo esperar para mi próximo viaje con ellos!"
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography paragraph>
                                        "¡Una experiencia inolvidable! El servicio al cliente fue excepcional y todo estuvo perfectamente organizado. ¡No puedo esperar para mi próximo viaje con ellos!"
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography paragraph>
                                        "¡Una experiencia inolvidable! El servicio al cliente fue excepcional y todo estuvo perfectamente organizado. ¡No puedo esperar para mi próximo viaje con ellos!"
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        
                    </Grid>
                </Box>

                
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Compromiso con la Sostenibilidad
                    </Typography>
                    <Typography paragraph>
                        Nos comprometemos a proteger el medio ambiente y apoyar a las comunidades locales. Descubre cómo estamos haciendo la diferencia...
                    </Typography>
                </Box>
        </Container>
        <Footer />
        </div>    
    );
};

export default AboutUs;
