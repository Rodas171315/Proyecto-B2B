// LoginPage.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías la autenticación del usuario
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Iniciar Sesión</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo"
                name="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Iniciar Sesión
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;