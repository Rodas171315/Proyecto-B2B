import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';

// Simulando comentarios existentes
const comentariosIniciales = [
  { id: 1, autor: "Juan Pérez", texto: "¡Experiencia increíble! Recomiendo esta agencia a todos." },
  { id: 2, autor: "Ana Gómez", texto: "Gran servicio y atención. Los viajes son siempre bien organizados." },
];

const Comentarios = () => {
  const [comentarios, setComentarios] = useState(comentariosIniciales);
  const [nuevoComentario, setNuevoComentario] = useState("");

  const agregarComentario = () => {
    const comentario = {
      id: comentarios.length + 1,
      autor: "Usuario Anónimo", 
      texto: nuevoComentario,
    };
    setComentarios([...comentarios, comentario]);
    setNuevoComentario(""); // Limpiar el campo de texto después de agregar el comentario
  };

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
