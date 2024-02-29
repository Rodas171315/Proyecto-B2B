// UserProfile.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

// Suponiendo que tienes una forma de obtener los datos del usuario actual
// Por simplicidad, usaré datos de ejemplo
const userData = {
  name: 'Pablo',
  email: 'pablo.moralesm355@gmail.com',
  country: 'Guatemala'
};

const UserProfilePage = () => {
  return (
    <Container>
      <h2>Perfil del Usuario</h2>
      <p><strong>Nombre:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>País:</strong> {userData.country}</p>
    </Container>
  );
};

export default UserProfilePage;
