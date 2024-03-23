import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Container, Row } from 'react-bootstrap';

function Comentarios({ idHabitacion }) {
  const [comentarios, setComentarios] = useState([]);
  const [textoComentario, setTextoComentario] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    fetchComentarios();
  }, [idHabitacion]); // Recarga comentarios cuando cambie idHabitacion

  const fetchComentarios = async () => {
    const response = await fetch(`http://localhost:8080/comentarios/por-habitacion/${idHabitacion}`);
    if (response.ok) {
      const data = await response.json();
      setComentarios(data);
    } else {
      console.error('Error al recuperar los comentarios');
      setComentarios([]); // Asegura limpieza en caso de error
    }
  };

  const crearComentario = async (e) => {
    e.preventDefault();
    // Asumiendo que idUsuario puede obtenerse de la sesión o contexto de autenticación
    const comentario = { idHabitacion, textoComentario, rating, idUsuario: 1 };
    const response = await fetch('http://localhost:8080/comentarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comentario),
    });

    if (response.ok) {
      setTextoComentario('');
      setRating(1);
      fetchComentarios(); // Recarga comentarios para mostrar el nuevo
    } else {
      console.error('Error al crear el comentario');
    }
  };

  return (
    <Container>
      <Row>
        <Form onSubmit={crearComentario}>
          <Form.Group className="mb-3" controlId="formComentarioTexto">
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escribe tu comentario aquí"
              value={textoComentario}
              onChange={(e) => setTextoComentario(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formComentarioRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar Comentario
          </Button>
        </Form>
      </Row>
      <Row>
        {comentarios.length > 0 ? comentarios.map((comentario) => (
          <Card key={comentario.idComentario} className="mb-3">
            <Card.Body>
            <Card.Title>Comentario de {comentario.nombreUsuario} - Rating: {comentario.rating}</Card.Title>
              <Card.Text>{comentario.textoComentario}</Card.Text>
              <Card.Footer>Comentado el: {new Date(comentario.fechaComentario).toLocaleString()}</Card.Footer>
            </Card.Body>
          </Card>
        )) : <p>No hay comentarios para esta habitación.</p>}
      </Row>
    </Container>
  );
}

export default Comentarios;
