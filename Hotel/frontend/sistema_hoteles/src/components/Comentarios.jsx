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

  const estructurarComentarios = (comentarios) => {
    //  map almacena la referencia de cada comentario por su ID
    const comentariosMap = comentarios.reduce((map, comentario) => {
      map[comentario.idComentario] = { ...comentario, respuestas: [] };
      return map;
    }, {});

    //  bucle asigna cada comentario a su respectivo padre
    comentarios.forEach(comentario => {
      if (comentario.idComentarioPadre) {
        const padre = comentariosMap[comentario.idComentarioPadre];
        if (padre) {
          padre.respuestas.push(comentariosMap[comentario.idComentario]);
        }
      }
    });

    // Filtra solo los comentarios de nivel superior
    return Object.values(comentariosMap).filter(comentario => !comentario.idComentarioPadre);
  };

  const fetchComentarios = async () => {
    try {
      console.log(`Cargando comentarios para la habitación ${idHabitacion}`);
      const response = await fetch(`http://localhost:8080/comentarios/por-habitacion/${idHabitacion}`);
      if (response.ok) {
        const data = await response.json();
        // Se estructuran los comentarios una sola vez
        const comentariosEstructurados = estructurarComentarios(data);
        setComentarios(comentariosEstructurados); // Utiliza solo comentarios estructurados
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
        fetchComentarios(); // Refresca los comentarios después de agregar uno nuevo
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
      <div key={comentario.idComentario} style={{ marginLeft: `${nivel * 20}px`, marginTop: '10px' }}>
        <Card style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)` }}>
          <Card.Body>
            <Card.Title>{comentario.nombreUsuario} - {comentario.rating} estrellas</Card.Title>
            <Card.Text>{comentario.textoComentario}</Card.Text>
            <div style={{ fontSize: '0.8em', color: '#666' }}>
              Publicado: {new Date(comentario.fechaComentario).toLocaleString()}
            </div>
            <Button variant="secondary" size="sm" onClick={() => setIdComentarioPadre(comentario.idComentario)}>Responder</Button>
          </Card.Body>
        </Card>
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

                  {/* Comentado para no mostrar a qué comentario se está respondiendo */}
        {/* {idComentarioPadre && (
          <div>Respondiendo al comentario #{idComentarioPadre}</div>
        )} */}

          {/* Muestra un botón diferente si el usuario está respondiendo a un comentario */}
          {idComentarioPadre ? (
            <>
              <div>Respondiendo al comentario</div>
              <Button variant="success" type="submit">Enviar Respuesta</Button>
            </>
          ) : (
            <Button variant="primary" type="submit">Enviar Comentario</Button>
          )}
        </Form>
      </Row>
      <Row>
        {renderComentarios(comentarios)}
      </Row>
    </Container>
  );
}

export default Comentarios;