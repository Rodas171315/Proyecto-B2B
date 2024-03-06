import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Ajusta la ruta de importación según tu estructura de archivos
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loginMessage, setLoginMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const navigate = useNavigate();
  const { login } = useUser(); // Asumiendo que tu contexto proporciona una función 'login'

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        // Guarda los datos del usuario en el contexto global y/o en localStorage
        login(data); // Actualiza el estado global del usuario con los datos de inicio de sesión
        localStorage.setItem('user', JSON.stringify(data)); // Opcional, si también usas localStorage
        navigate('/perfil'); // Redirige al usuario al perfil
      } else {
        throw new Error('Inicio de sesión fallido');
      }
    } catch (error) {
      setLoginMessage(error.message || 'Error al conectar con el servidor.');
      setShowAlert(true);
      setAlertVariant('danger');
    }
  };

  return (
    <Container className="my-5">
      {showAlert && <Alert variant={alertVariant}>{loginMessage}</Alert>}
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