import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Card, CardMedia, CardContent, Button, CardActions } from '@mui/material';

const DestinoPopular = () => {
  const { id } = useParams();
  const [destino, setDestino] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestino = async () => {
        console.log("El ID es: ", id); 
        try {
            
            const response = await fetch(`http://localhost:8080/contenido-estatico/destinos-populares/${id}`);
            if (!response.ok) throw new Error('No se pudo obtener el destino');
            const data = await response.json();
            setDestino(data);
        } catch (error) {
            console.error(error);
        }
    };
    if (id) { 
        fetchDestino();
    } else {
        console.log("ID no definido");
    }
}, [id]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Agencia de Viajes
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Volver</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {destino ? (
          <Card>
            <CardMedia
              component="img"
              height="250"
              image={destino.imagen}
              alt={`Imagen de ${destino.ciudad}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {destino.ciudad}, {destino.pais}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {destino.descripcion}
              </Typography>
            </CardContent>
            <CardActions>
        <Button size="small" color="primary" onClick={() => navigate(`/compra-destino/${id}`)}>Comprar</Button>
        </CardActions>
          </Card>
        ) : <Typography>Cargando...</Typography>}
        
      </Container>

    </div>
  );
};

export default DestinoPopular;

