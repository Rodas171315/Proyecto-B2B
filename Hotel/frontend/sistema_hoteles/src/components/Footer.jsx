import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg'; // Asegúrate de tener un logo en tus recursos

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col sm={6} md={3}>
            <img
              alt="Gala Resorts Group Logo"
              src={logo}
              className="footer-logo"
            />
          </Col>
          <Col sm={6} md={3}>
            <h5>Contacto</h5>
            <p>Teléfono de servicio al cliente: (+502) 2356-7800</p>
            <p>Dirección: 1 Avenida 12-47, Zona 10 Guatemala, City 01010</p>
          </Col>
          <Col sm={6} md={3}>
            <h5>Legal</h5>
            {/* Agregar aquí enlaces a páginas legales como Términos de servicio, Política de privacidad, etc. */}
            <a href="#terms">Términos de Servicio</a>
            <a href="#privacy">Política de Privacidad</a>
          </Col>
          <Col sm={6} md={3}>
            <h5>Síguenos</h5>
            {/* Agregar aquí enlaces a redes sociales */}
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#instagram">Instagram</a>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center mt-4">
              © {new Date().getFullYear()} Gala Resorts Group. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
