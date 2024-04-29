import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import emailjs from 'emailjs-com';
import Header from './Header'; 
import Footer from './Footer'; 
import ReCAPTCHA from "react-google-recaptcha";

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

    const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
                    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
                    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
                    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
                    "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
                    "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
                    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini ", "Ethiopia",
                    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
                    "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
                    "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
                    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
                    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
                    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
                    "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
                    "Nigeria", "North Korea", "North Macedonia (formerly Macedonia)", "Norway", "Oman", "Pakistan", "Palau", "Palestine State",
                    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
                    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
                    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
                    "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
                    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
                    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
                    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen",
                    "Zambia", "Zimbabwe"];


    const [captchaToken, setCaptchaToken] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://35.211.214.127:8100/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                
                const templateParams = {
                    to_name: user.primer_nombre,
                    to_email: user.email,
                    
                };

                emailjs.send('service_97sfyyu', 'template_cy2enpo', templateParams, 'JuvkFpFUkVC3f6giZ')
                    .then((result) => {
                        console.log(result.text);
                        setShowSuccess(true);
                        navigate('/login');
                    }, (error) => {
                        console.log(error.text);
                        setShowError(true);
                    });
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

                        
                        <ReCAPTCHA
                            sitekey="6Lc2g6UpAAAAAJacvQNmo6OvOXyN-hJ2qs3hEkA0"
                            onChange={setCaptchaToken}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!captchaToken}  
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
