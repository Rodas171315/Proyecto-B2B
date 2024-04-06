import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Container, Row } from 'react-bootstrap';
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

  const fetchComentarios = async () => {
    try {
      console.log(`Cargando comentarios para la habitación ${idHabitacion}`);
      const response = await fetch(`http://localhost:8080/comentarios/por-habitacion/${idHabitacion}`);
      if (response.ok) {
        const data = await response.json();
        setComentarios(data);
        console.log("Comentarios cargados exitosamente:", data);
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

    console.log("Enviando comentario:", comentarioData);

    try {
      const response = await fetch('http://localhost:8080/comentarios', {
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

  const responderAComentario = (idComentario) => {
    setIdComentarioPadre(idComentario);
  };


  const mapComentarios = {};
comentarios.forEach(comentario => {
  if (comentario.idComentarioPadre) {
    if (!mapComentarios[comentario.idComentarioPadre]) {
      mapComentarios[comentario.idComentarioPadre] = [];
    }
    mapComentarios[comentario.idComentarioPadre].push(comentario);
  }
});





const comentariosMap = {};
comentarios.forEach(comentario => {
  comentariosMap[comentario.idComentario] = {...comentario, respuestas: []};
});

//  aca se asigna los comentarios a su padre correspondiente
comentarios.forEach(comentario => {
  if (comentario.idComentarioPadre) {
    if (comentariosMap[comentario.idComentarioPadre]) {
      comentariosMap[comentario.idComentarioPadre].respuestas.push(comentario);
    }
  }
});

const comentariosDeNivelSuperior = Object.values(comentariosMap).filter(comentario => !comentario.idComentarioPadre);

const renderComentarios = (comentariosParaRenderizar, nivel = 0) => {
  const baseColor = 200; 
  const colorDifuminado = baseColor - (nivel * 30); 

  return comentariosParaRenderizar.map(comentario => (
    <div key={comentario.idComentario} style={{ marginLeft: `${nivel * 20}px`, marginTop: '10px' }}>
      <Card style={{ backgroundColor: `hsla(${colorDifuminado}, 100%, 90%, 0.5)` }}>
        <Card.Body>
          <Card.Title>{comentario.nombreUsuario} - {comentario.rating} estrellas</Card.Title>
          <Card.Text>{comentario.textoComentario}</Card.Text>
          {nivel > 0 && <div style={{ fontSize: '0.8em', color: '#666' }}>{comentario.idComentarioPadre}</div>}
          <Button variant="secondary" size="sm" onClick={() => setIdComentarioPadre(comentario.idComentario)}>Responder</Button>
        </Card.Body>
      </Card>
      {/* Renderizar de manera recursiva si hay respuestas */}
      {comentario.respuestas && comentario.respuestas.length > 0 && renderComentarios(comentario.respuestas, nivel + 1)}
    </div>
  ));
};
  





  return (
    <Container>
      <Row>
        <Form onSubmit={crearComentario}>
          <Form.Group controlId="textoComentario">
            <Form.Label>Comentario</Form.Label>
            <Form.Control as="textarea" rows={3} value={textoComentario} onChange={(e) => setTextoComentario(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          {idComentarioPadre && (
            <div>Respondiendo al comentario #{idComentarioPadre}</div>
          )}
          <Button variant="primary" type="submit">Enviar Comentario</Button>
        </Form>
      </Row>
      <Row>
      {renderComentarios(comentariosDeNivelSuperior)}
      </Row>
    </Container>
  );
}

export default Comentarios;
