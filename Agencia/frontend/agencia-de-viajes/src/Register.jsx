import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import Header from './Header'; 
import Footer from './Footer'; 

const Register = () => {
    const [user, setUser] = useState({
        rol: 1, 
        email: '',
        password: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        fecha_nacimiento: '',
        nacionalidad: '',
        pasaporte: '',
    });

    const countries = ["Estados Unidos", "México", "Colombia", "Argentina", "España", "Francia", "Italia"];

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        

        try {
            const response = await fetch('http://localhost:8080/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                setShowSuccess(true);
                
                navigate('/login');
            } else {
                setShowError(true);
               
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
            setShowError(true);
            
        }
    };

    return (
        <div>
            <Header />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Registrarse
                    </Typography>
                    {showSuccess && <Alert severity="success">Registro exitoso. Por favor, inicie sesión.</Alert>}
                    {showError && <Alert severity="error">Error al registrar. Intente nuevamente.</Alert>}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo Electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={user.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="rol"
                            label="Rol"
                            name="rol"
                            autoComplete="rol"
                            autoFocus
                            value={user.rol}
                            onChange={handleChange}
                        />
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={user.password}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="primer_nombre"
                            label="Primer Nombre"
                            name="primer_nombre"
                            autoComplete="fname"
                            value={user.primer_nombre}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="segundo_nombre"
                            label="Segundo Nombre (Opcional)"
                            name="segundo_nombre"
                            autoComplete="fname"
                            value={user.segundo_nombre}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="primer_apellido"
                            label="Primer Apellido"
                            name="primer_apellido"
                            autoComplete="lname"
                            value={user.primer_apellido}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="segundo_apellido"
                            label="Segundo Apellido (Opcional)"
                            name="segundo_apellido"
                            autoComplete="lname"
                            value={user.segundo_apellido}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fecha_nacimiento"
                            label="Fecha de Nacimiento"
                            type="date"
                            name="fecha_nacimiento"
                            InputLabelProps={{ shrink: true }}
                            value={user.fecha_nacimiento}
                            onChange={handleChange}
                        />
                        <TextField
                            select
                            label="Nacionalidad"
                            name="nacionalidad"
                            value={user.nacionalidad}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            {countries.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pasaporte"
                            label="Número de Pasaporte"
                            name="pasaporte"
                            autoComplete="passport-number"
                            value={user.pasaporte}
                            onChange={handleChange}
                        />

                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrarse
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </div> 
    );
};

export default Register;
