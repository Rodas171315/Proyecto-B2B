import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Container, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useUser } from './UserContext';

function Comentarios({ idHabitacion }) {
  const [comentarios, setComentarios] = useState([]);
  const [textoComentario, setTextoComentario] = useState('');
  const [rating, setRating] = useState(1);
  const [idComentarioPadre, setIdComentarioPadre] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    fetchComentarios();
  }, [idHabitacion]);

  const estructurarComentarios = (comentarios) => {
   
    const comentariosMap = comentarios.reduce((map, comentario) => {
      map[comentario.idComentario] = { ...comentario, respuestas: [] };
      return map;
    }, {});

    
    comentarios.forEach(comentario => {
      if (comentario.idComentarioPadre) {
        const padre = comentariosMap[comentario.idComentarioPadre];
        if (padre) {
          padre.respuestas.push(comentariosMap[comentario.idComentario]);
        }
      }
    });

    
    return Object.values(comentariosMap).filter(comentario => !comentario.idComentarioPadre);
  };

  const fetchComentarios = async () => {
    try {
      console.log(`Cargando comentarios para la habitación ${idHabitacion}`);
      const response = await fetch(`http://35.211.214.127:8080/comentarios/por-habitacion/${idHabitacion}`);
      if (response.ok) {
        const data = await response.json();
        
        const comentariosEstructurados = estructurarComentarios(data);
        setComentarios(comentariosEstructurados); 
        console.log("Comentarios estructurados exitosamente:", comentariosEstructurados);
      } else {
        console.error('Error al recuperar los comentarios', response);
      }
    } catch (error) {
      console.error('Error al recuperar los comentarios:', error);
    }
  };

  const crearComentario = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      alert('Debes estar registrado y haber iniciado sesión para realizar un comentario.');
      return;
    }

    const comentarioData = {
      idHabitacion,
      idUsuario: user.id,
      textoComentario,
      rating,
      idComentarioPadre
    };

    try {
      const response = await fetch('http://35.211.214.127:8080/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comentarioData)
      });

      if (response.ok) {
        console.log("Comentario creado exitosamente");
        setTextoComentario('');
        setRating(1);
        setIdComentarioPadre(null);
        fetchComentarios(); 
      } else {
        console.error('Error al crear el comentario', response);
      }
    } catch (error) {
      console.error('Error al crear el comentario:', error);
    }
  };

const renderComentarios = (comentariosParaRenderizar, nivel = 0) => {
    const hue = 50; 
    const saturation = 30 - (nivel * 5); 
    const lightness = 90 - (nivel * 15); 

    return comentariosParaRenderizar.map(comentario => (
      <Box key={comentario.idComentario} sx={{ ml: `${nivel * 2}em`, mt: '10px' }}>
        <Card sx={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)` }}>
          <CardContent>
            <Typography variant="h6">{comentario.nombreUsuario} - {comentario.rating} estrellas</Typography>
            <Typography>{comentario.textoComentario}</Typography>
            <Typography sx={{ fontSize: '0.8em', color: '#666' }}>
              Publicado: {new Date(comentario.fechaComentario).toLocaleString()}
            </Typography>
            <Button size="small" onClick={() => setIdComentarioPadre(comentario.idComentario)}>Responder</Button>
          </CardContent>
        </Card>
        {comentario.respuestas && comentario.respuestas.length > 0 && renderComentarios(comentario.respuestas, nivel + 1)}
      </Box>
    ));
  };

  return (
    <Container>
      <Box component="form" onSubmit={crearComentario} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="textoComentario"
          label="Comentario"
          name="textoComentario"
          multiline
          rows={4}
          value={textoComentario}
          onChange={(e) => setTextoComentario(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="rating-label">Rating</InputLabel>
          <Select
            labelId="rating-label"
            id="rating"
            value={rating}
            label="Rating"
            onChange={(e) => setRating(e.target.value)}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          {idComentarioPadre ? 'Enviar Respuesta' : 'Enviar Comentario'}
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        {renderComentarios(comentarios)}
      </Box>
    </Container>
  );
}

export default Comentarios;
