import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Card, CardContent, Button, CardMedia, CardActions } from '@mui/material';
import Footer from './Footer'; 


const PromocionOfertaEspecialDetalles = () => {
  const { id } = useParams();
  const [oferta, setOferta] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOferta = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/contenido-estatico/promociones-ofertas-especiales/${id}`);
        if (!response.ok) throw new Error('No se pudo obtener la oferta especial');
        const data = await response.json();
        setOferta(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOferta();
  }, [id]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Agencia de Viajes - Oferta Especial
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Volver</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {oferta && (
          <Card>
            <CardMedia
              component="img"
              height="250"
              image={oferta.imagen}
              alt={`Imagen de ${oferta.paquete}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {oferta.paquete}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {oferta.descripcion}
              </Typography>
              
            </CardContent>
            <CardActions>
        <Button size="small" color="primary" onClick={() => navigate(`/compra-promocion/${id}`)}>Comprar</Button>
        </CardActions>
          </Card>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default PromocionOfertaEspecialDetalles;
