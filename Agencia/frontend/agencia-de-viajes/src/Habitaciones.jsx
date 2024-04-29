import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';

const Habitaciones = ({ habitaciones }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            {habitaciones.map((habitacion, index) => (
                <Box key={index} mt={2} mb={2}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {habitacion.tipo}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {habitacion.descripcion}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                                {`Precio: $${habitacion.precio} por noche`}
                            </Typography>
                            <Slider {...settings}>
                                {habitacion.imagenes.map((imagen, imgIndex) => (
                                    <Box key={imgIndex}>
                                        <CardMedia
                                            component="img"
                                            image={imagen}
                                            alt={`Imagen de la habitación ${habitacion.tipo}`}
                                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                        />
                                    </Box>
                                ))}
                            </Slider>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </div>
    );
};

export default Habitaciones;
