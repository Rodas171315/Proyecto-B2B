import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, TextField, Grid, CardMedia, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const CompraPromocion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [oferta, setOferta] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
  
    useEffect(() => {
      const fetchOferta = async () => {
        try {
          const response = await fetch(`http://localhost:8080/contenido-estatico/promociones-ofertas-especiales/${id}`);
          if (!response.ok) throw new Error('No se pudo obtener la oferta especial');
          const data = await response.json();
          setOferta(data);
        } catch (error) {
          console.error('Error al cargar la oferta:', error);
        }
      };
      fetchOferta();
    }, [id]);
  
    const completarCompra = () => {
      console.log('Compra completada');
      setOpenDialog(true);
    };
  
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Agencia de Viajes - Compra Oferta Especial
            </Typography>
            <Button color="inherit" onClick={() => navigate('/')}>Volver al inicio</Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Card>
          <CardMedia
              component="img"
              height="250"
              image={oferta.imagen}
              alt={`Imagen de ${oferta.paquete}`}
            />
            <CardContent>
              <Typography variant="h5" component="h2">Completa tu compra</Typography>
              {oferta && (
                <>
                  <Typography variant="h6">{oferta.paquete}</Typography>
                  <Typography variant="body1">{oferta.descripcion}</Typography>
                  
                </>
              )}
              
              <TextField fullWidth label="Nombre" margin="normal" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField fullWidth label="Teléfono" margin="normal" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              <TextField fullWidth label="Número de Tarjeta" margin="normal" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} />
              <Button variant="contained" color="primary" onClick={completarCompra}>Completar Compra</Button>
            </CardContent>
          </Card>
        </Container>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="dialog-title" aria-describedby="dialog-description">
          <DialogTitle id="dialog-title">Compra realizada con éxito</DialogTitle>
          <DialogContent>
            <DialogContentText id="dialog-description">Tu compra ha sido completada exitosamente. Pronto recibirás más información.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => navigate('/')} color="primary">Volver al inicio</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

export default CompraPromocion;
