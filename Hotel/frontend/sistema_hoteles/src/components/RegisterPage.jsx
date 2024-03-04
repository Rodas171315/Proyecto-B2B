import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const countries = [    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
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

const RegisterPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    primer_nombre: '',
    segundo_nombre: '', // Asumiendo que quieres capturar este dato también
    primer_apellido: '',
    segundo_apellido: '', // Asumiendo que quieres capturar este dato también
    fecha_nacimiento: '', // Asegúrate de ajustar el formato de fecha para que coincida con el esperado por el backend
    nacionalidad: '',
    pasaporte: '' // Este se convertirá a número antes de enviar
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usuarioToSend = {
        ...user,
        rol: 1, // Estableciendo rol predeterminado a 1
        pasaporte: parseInt(user.pasaporte, 10) // Convertir pasaporte a número
      };

      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioToSend),
      });

      if (!response.ok) {
        throw new Error('La respuesta de la red no fue ok');
      }

      setShowSuccess(true);
      setUser({
        email: '',
        password: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        fecha_nacimiento: '',
        nacionalidad: '',
        pasaporte: ''
      });
    } catch (error) {
      console.error('Error al enviar datos:', error);
      alert('Error al conectar con el servidor. Por favor, asegúrate de que el servidor esté corriendo y accesible.');
    }
  };

  return (
    <Container className="my-5">
      {showSuccess && <Alert variant="success">Registro exitoso. Por favor inicia sesión.</Alert>}
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Crear Cuenta</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Ingrese su correo" 
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Contraseña" 
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>Primer Nombre</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese su primer nombre" 
                name="primer_nombre" // Cambiado a snake_case para coincidir con la clase Java
                value={user.primer_nombre} // Asegúrate de ajustar el estado inicial
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group controlId="formBasicSecondName">
              <Form.Label>Segundo Nombre</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese su segundo nombre" 
                name="segundo_nombre" // Cambiado a snake_case
                value={user.segundo_nombre} // Asegúrate de ajustar el estado inicial
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Primer Apellido</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese su primer apellido" 
                name="primer_apellido" // Cambiado a snake_case
                value={user.primer_apellido} // Asegúrate de ajustar el estado inicial
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group controlId="formBasicSecondLastName">
              <Form.Label>Segundo Apellido</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese su segundo apellido" 
                name="segundo_apellido" // Cambiado a snake_case
                value={user.segundo_apellido} // Asegúrate de ajustar el estado inicial
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group controlId="formBasicDateOfBirth">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control 
                type="date" 
                name="fecha_nacimiento" // Cambiado a snake_case
                value={user.fecha_nacimiento} // Asegúrate de ajustar el estado inicial
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group controlId="formBasicCountry">
              <Form.Label>País de Origen</Form.Label>
              <Form.Select 
                name="nacionalidad"
                value={user.nacionalidad}
                onChange={handleChange}
              >
                <option>Seleccione un país</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </Form.Select>
            </Form.Group>
  
            <Form.Group controlId="formBasicPassportNumber">
              <Form.Label>Número de Pasaporte</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese su número de pasaporte" 
                name="pasaporte"
                value={user.pasaporte}
                onChange={handleChange}
              />
            </Form.Group>
  
            <Button variant="primary" type="submit" className="mt-3">
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
  
};

export default RegisterPage;