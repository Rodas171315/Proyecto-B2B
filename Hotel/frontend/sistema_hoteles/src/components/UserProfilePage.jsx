import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const getRoleDescription = (roleId) => {
    switch (roleId) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Cliente';
      case 3:
        return 'Cliente Empresarial';
      default:
        return 'Visitante Anónimo';
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return (
      <Container className="mt-5">
        <p>No hay usuario logueado.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Header>Perfil del Usuario</Card.Header>
        <Card.Body>
          <Card.Title>{`${user.primer_nombre} ${user.segundo_nombre} ${user.primer_apellido} ${user.segundo_apellido}`}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>País: {user.nacionalidad}</Card.Text>
          <Card.Text>Tipo: {getRoleDescription(user.rol)}</Card.Text>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfilePage;
