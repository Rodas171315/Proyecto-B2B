import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loginSuccess, setLoginSuccess] = useState(false); // Estado para manejar el éxito del login
  const [loginError, setLoginError] = useState(false); // Estado para manejar el error del login

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar credenciales
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === credentials.email && storedUser.password === credentials.password) {
      setLoginSuccess(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setLoginSuccess(false);
    }
  };

  return (
    <Container className="my-5">
      {loginSuccess && <Alert variant="success">Bienvenido/a {credentials.email}</Alert>}
      {loginError && <Alert variant="danger">Error en el inicio de sesión. Verifica tus credenciales.</Alert>}
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