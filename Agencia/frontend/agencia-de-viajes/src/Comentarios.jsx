import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, Container } from '@mui/material';
import { useUser } from './UserContext';

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [comentarioRespuestaId, setComentarioRespuestaId] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { user } = useUser();


  const cargarComentarios = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch('http://localhost:8080/comentarios');
      const textoRespuesta = await respuesta.text();
      try {
        const data = JSON.parse(textoRespuesta);
        setComentarios(data);
      } catch (parseError) {
        console.error("Error al analizar la respuesta JSON:", parseError);
        
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarComentarios();
  }, []);
  useEffect(() => {
    cargarComentarios();
  }, []);

  const agregarComentario = async () => {
    if (!user) {
      console.error("No hay usuario autenticado");
      return;
    }
  
    
    const comentarioData = comentarioRespuestaId ? {
      usuario: { id: user.id }, 
      comentario: nuevoComentario,
      parent: { id: comentarioRespuestaId }, 
    } : {
      usuario: { id: user.id },
      comentario: nuevoComentario,
    };
  
    try {
      const respuesta = await fetch('http://localhost:8080/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comentarioData),
      });
      if (!respuesta.ok) throw new Error('Error al agregar el comentario');
      cargarComentarios(); 
      setNuevoComentario(""); 
      setComentarioRespuestaId(null); 
    } catch (error) {
      console.error(error.message);
    }
  };

  if (cargando) return <p>Cargando comentarios...</p>;

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mb: 2 }}>Comentarios de nuestros clientes</Typography>
      <Grid container spacing={2}>
        {comentarios.map((comentario) => (
          <Grid item xs={12} key={comentario.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{comentario.usuario ? comentario.usuario.nombre : 'Anónimo'}</Typography>
                <Typography variant="body2">{comentario.comentario}</Typography>
                <Button size="small" onClick={() => setComentarioRespuestaId(comentario.id)}>Responder</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Deja tu comentario</Typography>
      <TextField
        label="Tu Comentario"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={nuevoComentario}
        onChange={(e) => setNuevoComentario(e.target.value)}
        sx={{ mb: 2 }}
      />
      {comentarioRespuestaId && <Typography>Respondiendo al comentario ID: {comentarioRespuestaId}</Typography>}
      <Button variant="contained" onClick={agregarComentario}>Publicar Comentario</Button>
    </Container>
  );
};

export default Comentarios;
