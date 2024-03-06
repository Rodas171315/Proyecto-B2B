import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useUser } from './UserContext'; // Asegúrate de que la ruta es correcta según tu estructura de archivos
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir tras el logout

const UserProfilePage = () => {
  const { user, logout } = useUser(); // Accede al estado del usuario y a la función logout a través del contexto
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Llama a la función logout del contexto
    localStorage.removeItem('user'); // Opcional: limpia el localStorage si estás usando para almacenar datos del usuario
    navigate('/'); // Redirige al usuario a la página principal tras el logout
  };

  // Verificar si hay un usuario logueado
  if (!user) {
    return (
      <Container>
        <p>No hay usuario logueado.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Perfil del Usuario</h2>
      <p><strong>Nombre:</strong> {user.primer_nombre} {user.segundo_nombre} {user.primer_apellido} {user.segundo_apellido}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>País:</strong> {user.nacionalidad}</p>
      {/* Botón de cierre de sesión */}
      <Button onClick={handleLogout} variant="danger" className="mt-3">Cerrar Sesión</Button>
    </Container>
  );
};

export default UserProfilePage;
