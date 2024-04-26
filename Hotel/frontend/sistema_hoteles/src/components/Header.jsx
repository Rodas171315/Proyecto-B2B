import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.jpg';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useUser } from './UserContext'; 

const Header = () => {
  const { cartItems } = useCart();
  const { user } = useUser(); // Utiliza el hook para acceder al estado del usuario

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="header">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <img alt="Gala Resorts Group Logo" src={logo} className="logo" />
          <span className="brand-name">Gala Resorts Group</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            {!user && ( // Muestra Inicia Sesión y Regístrate solo si no hay usuario logueado
              <>
                <Nav.Link as={Link} to="/login">Inicia Sesión</Nav.Link>
                <Nav.Link as={Link} to="/registro">Regístrate</Nav.Link>
              </>
            )}
<Nav.Link as={Link} to="/faqs">FAQs</Nav.Link>

            <Nav.Link as={Link} to="/booking-history">Historial de Reservas</Nav.Link>
            <Nav.Link as={Link} to="/hotel-details">Hoteles</Nav.Link>
            {user && user.rol === 1 && (
  <>
    <Nav.Link as={Link} to="/add-hotel">Gestionar Hoteles</Nav.Link>
    <Nav.Link as={Link} to="/add-habitacion">Gestionar Habitaciones</Nav.Link>
    <Nav.Link as={Link} to="/Administrar">Administrar Usuarios</Nav.Link>
    <Nav.Link as={Link} to="/AdministrarReservas">Administrar Reservas</Nav.Link>
    <Nav.Link as={Link} to="/Analiticos">Analiticos</Nav.Link>


  </>
)}



            {user && ( // Muestra Perfil solo si hay usuario logueado
              <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
            )}

          </Nav>
          <Form className="d-flex">
            <FormControl type="text" placeholder="Buscar hoteles, vuelos..." className="me-2 search-input" />
            <Button variant="outline-light">Buscar</Button>
          </Form>
          <Nav.Link as={Link} to="/cart" className="shopping-cart">
            <FaShoppingCart color="white" />
            <Badge pill bg="danger">{cartItems.length}</Badge>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;