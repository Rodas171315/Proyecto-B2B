import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.jpg';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Header = () => {
  const { cartItems } = useCart();

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
            <Nav.Link as={Link} to="/login">Inicia Sesión</Nav.Link>
            <Nav.Link as={Link} to="/registro">Regístrate</Nav.Link>
            <Nav.Link as={Link} to="/booking-history">Historial de Reservas</Nav.Link>
            {/* Nuevo enlace a Hoteles */}
            <Nav.Link as={Link} to="/hotel-details">Hoteles</Nav.Link>
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
