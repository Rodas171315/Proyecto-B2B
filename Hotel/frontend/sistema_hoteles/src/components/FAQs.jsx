import React from 'react';
import { Accordion, Container } from 'react-bootstrap';

const FAQs = () => {
  const styles = {
    container: {
      padding: '2rem',
      background: '#f5f5f5',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      marginTop: '2rem',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '2rem',
      color: '#007bff',
    },
    sectionHeader: {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      color: '#343a40',
      marginTop: '2rem',
    },
    text: {
      fontSize: '1rem',
      color: '#212529',
      lineHeight: '1.5',
    },
    listItem: {
      fontSize: '1rem',
      color: '#212529',
    },
  };

  return (
    <Container style={styles.container}>
      <h2 style={styles.header}>Preguntas Frecuentes</h2>
      
      {/* Misión, Visión y Objetivos */}
      <section>
        <h3 style={styles.sectionHeader}>Nuestra Misión</h3>
        <p style={styles.text}>Ofrecer experiencias de alojamiento únicas y memorables, asegurando siempre el máximo confort y calidad en nuestros servicios.</p>

        <h3 style={styles.sectionHeader}>Nuestra Visión</h3>
        <p style={styles.text}>Ser líderes en la industria hotelera, reconocidos por nuestra innovación, servicio excepcional y compromiso con la sostenibilidad.</p>

        <h3 style={styles.sectionHeader}>Objetivos</h3>
        <ul>
          <li style={styles.listItem}>Exceder las expectativas de nuestros huéspedes a través de un servicio personalizado.</li>
          <li style={styles.listItem}>Promover prácticas sostenibles que respeten el medio ambiente y la comunidad.</li>
          <li style={styles.listItem}>Expandir nuestra presencia a nivel global manteniendo altos estándares de calidad.</li>
        </ul>
      </section>
      
      {/* Preguntas Frecuentes */}
      <Accordion defaultActiveKey="0" className="mt-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>¿Cómo puedo hacer una reserva?</Accordion.Header>
          <Accordion.Body style={styles.text}>
            Puede hacer una reserva a través de nuestro sitio web, seleccionando el hotel de su preferencia, las fechas de estancia y completando el proceso de reserva en línea.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>¿Qué medidas de seguridad se están tomando en los hoteles?</Accordion.Header>
          <Accordion.Body style={styles.text}>
            Nuestros hoteles siguen estrictas medidas de seguridad y limpieza para garantizar el bienestar de nuestros huéspedes, incluyendo sanitización regular, uso de mascarillas y distanciamiento social.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQs;
