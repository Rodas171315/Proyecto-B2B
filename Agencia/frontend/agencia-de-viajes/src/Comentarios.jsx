import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';
import { useUser } from './UserContext'; 

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [cargando, setCargando] = useState(true);
  const { user } = useUser(); 

  const cargarComentarios = async () => {
    try {
      const respuesta = await fetch('http://localhost:8080/comentarios');
      if (!respuesta.ok) throw new Error('Error al obtener los comentarios');
      const data = await respuesta.json();
      setComentarios(data);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };
  useEffect(() => {
    

    cargarComentarios();
  }, []);

  const agregarComentario = async () => {
    if (!user) {
      console.error("No hay usuario autenticado");
      return;
    }

    const comentarioData = {
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
      await cargarComentarios(); 
      setNuevoComentario(""); 
    } catch (error) {
      console.error(error.message);
    }
  };


  if (cargando) return <p>Cargando comentarios...</p>;

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Comentarios de nuestros clientes</Typography>
      <Grid container spacing={2}>
        {comentarios.map((comentario) => (
          <Grid item xs={12} key={comentario.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{comentario.autor}</Typography>
                <Typography variant="body2">{comentario.texto}</Typography>
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
      <Button variant="contained" onClick={agregarComentario}>Publicar Comentario</Button>
    </div>
  );
};

export default Comentarios;
