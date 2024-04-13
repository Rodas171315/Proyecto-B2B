import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { Container, Button, TextField, Box, Typography, Alert } from '@mui/material';
import Header from './Header'; 
import Footer from './Footer'; 

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loginMessage, setLoginMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser(); 

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://35.211.214.127:8100/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Inicio de sesión fallido');
      }
      const data = await response.json();
      login(data); 
      localStorage.setItem('user', JSON.stringify(data)); 
      navigate('/userprofile'); 
    } catch (error) {
      setLoginMessage(error.message || 'Error al conectar con el servidor.');
      setShowAlert(true);
    }
  };

  return (
    <div>
    <Header />
    <Container component="main" maxWidth="xs">
      {showAlert && <Alert severity="error">{loginMessage}</Alert>}
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Iniciar Sesión</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
      
    </Container>
    <Footer />
    </div>
  );
};

export default Login;

