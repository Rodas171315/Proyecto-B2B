import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Typography, Card, CardContent, Divider, DialogTitle, CardActions, CardMedia, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from './Header';
import Footer from './Footer';
import { useUser } from './UserContext';


const FormDialog = ({ open, handleClose, handleSubmit, entity, isEditing, tipo }) => {

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (entity && isEditing) {
      setNombre(entity.nombre);
      setDescripcion(entity.descripcion);
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [entity, isEditing]);

  const onSubmit = () => {
    handleSubmit({ id: entity?.id, nombre, descripcion, tipo });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditing ? 'Editar' : 'Crear'} {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="nombre"
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          margin="dense"
          id="descripcion"
          label="Descripción"
          type="text"
          fullWidth
          variant="standard"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={onSubmit}>{isEditing ? 'Editar' : 'Crear'}</Button>
      </DialogActions>
    </Dialog>
  );
};

const AfiliadosComponent = () => {
  const [hoteles, setHoteles] = useState([]);
  const [aerolineas, setAerolineas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tipo, setTipo] = useState('');
  const { user } = useUser();

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = () => {
    fetch('http://localhost:8081/hotelesA')
      .then((response) => response.json())
      .then(setHoteles)
      .catch((error) => console.error("Error al cargar Hoteles:", error));

    fetch('http://localhost:8081/aerolineas')
      .then((response) => response.json())
      .then(setAerolineas)
      .catch((error) => console.error("Error al cargar Aerolíneas:", error));
  };

  const handleOpenDialog = (entity = null, tipo) => {
    setCurrentEntity(entity);
    setIsEditing(!!entity);
    setTipo(tipo);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentEntity(null);
    setIsEditing(false);
    setTipo('');
  };

  const handleSubmit = async (entity) => {

    const baseUrl = 'http://localhost:8081/';
    const urlPart = entity.tipo === 'hotel' ? 'hotelesA' : 'aerolineas';
    const url = entity.id ? `${baseUrl}${urlPart}/${entity.id}` : `${baseUrl}${urlPart}`;
  
    try {
      const response = await fetch(url, {
        method: entity.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: entity.nombre,
          descripcion: entity.descripcion,
          
          ...(entity.tipo === 'hotel' && { ubicacion: entity.ubicacion }) 
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      
      fetchEntities(); 
    } catch (error) {
      console.error("Error al guardar la entidad:", error);
    }
  };
  

  

  const handleDelete = async (id, tipo) => {
   
    let baseUrl = 'http://localhost:8081/';
    baseUrl += tipo === 'hotel' ? 'hotelesA/' : 'aerolineas/';
  
    try {
      const response = await fetch(`${baseUrl}${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      fetchEntities(); 
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };
  


  const renderHotelCard = (hotel) => (
    <Grid item key={hotel.id} xs={12} sm={6} md={4}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={`https://source.unsplash.com/random?hotel=${hotel.id}`}
          alt="hotel image"
        />
        <CardContent>
          <Typography variant="h6">{hotel.nombre}</Typography>
          <Typography variant="body2" color="text.secondary">{hotel.descripcion}</Typography>
        </CardContent>
        {user && user.rol === 2 && (
        <CardActions>
          <Button size="small" onClick={() => handleOpenDialog(hotel, 'hotel')}><EditIcon /></Button>
          <Button size="small" onClick={() => handleDelete(hotel.id, 'hotel')}><DeleteIcon /></Button>
        </CardActions>
        )}
      </Card>
    </Grid>
  );

  const renderAerolineaCard = (aerolinea) => (
    <Grid item key={aerolinea.id} xs={12} sm={6} md={4}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={`https://source.unsplash.com/random?airline=${aerolinea.id}`}
          alt="airline image"
        />
        <CardContent>
          <Typography variant="h6">{aerolinea.nombre}</Typography>
          <Typography variant="body2" color="text.secondary">{aerolinea.descripcion}</Typography>
        </CardContent>
        {user && user.rol === 2 && (
        <CardActions>
          <Button size="small" onClick={() => handleOpenDialog(aerolinea, 'aerolinea')}><EditIcon /></Button>
          <Button size="small" onClick={() => handleDelete(aerolinea.id, 'aerolinea')}><DeleteIcon /></Button>
        </CardActions>
        )}
      </Card>
    </Grid>
  );

  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Divider sx={{ mb: 2 }} />
        {user && user.rol === 2 && (
          <>
            <Button startIcon={<AddIcon />} onClick={() => handleOpenDialog(null, 'hotel')} sx={{ mb: 2 }}>
              Agregar Hotel
            </Button>
            <Button startIcon={<AddIcon />} onClick={() => handleOpenDialog(null, 'aerolinea')} sx={{ mb: 2 }}>
              Agregar Aerolínea
            </Button>
          </>
        )}
        {user && user.rol === 2 && (
          <FormDialog
            open={openDialog}
            handleClose={handleCloseDialog}
            handleSubmit={handleSubmit}
            entity={currentEntity}
            isEditing={isEditing}
            tipo={tipo}
          />
        )}
        <Typography variant="h5" gutterBottom>Hoteles Afiliados</Typography>
        <Grid container spacing={2}>
          {hoteles.map(renderHotelCard)}
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" gutterBottom>Aerolíneas Afiliadas</Typography>
        <Grid container spacing={2}>
          {aerolineas.map(renderAerolineaCard)}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default AfiliadosComponent;

