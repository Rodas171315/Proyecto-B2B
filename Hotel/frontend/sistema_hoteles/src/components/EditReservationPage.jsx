import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditReservationPage = ({ show, handleClose, reserva, actualizarReserva }) => {
  const [checkIn, setCheckIn] = useState(reserva.fechaIngreso);
  const [checkOut, setCheckOut] = useState(reserva.fechaSalida);
  // Asumiendo que tipoHabitacion ya viene correctamente mapeado a un idHabitacion
  const [tipoHabitacion, setTipoHabitacion] = useState(reserva.tipoHabitacion);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí asumimos que el campo idHabitacion debe ser parte de reservaActualizada
    const reservaActualizada = {
        ...reserva,
        fechaIngreso: checkIn,
        fechaSalida: checkOut,
        idTipoHabitacion: tipoHabitacion,
        idHabitacion: reserva.idHabitacion, // Asumiendo que reserva ya tiene idHabitacion
    };

    console.log('Enviando reserva actualizada:', reservaActualizada);

    try {
        const response = await fetch(`http://localhost:8080/reservas/${reserva.idReserva}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservaActualizada),
        });

        if (!response.ok) {
            throw new Error('No se pudo actualizar la reserva');
        }

        // Si la actualización es exitosa, haz lo que sea necesario, como cerrar el modal
        handleClose();
    } catch (error) {
        console.error('Error al actualizar la reserva:', error);
    }
};





  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCheckIn">
            <Form.Label>Check-in</Form.Label>
            <Form.Control
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCheckOut">
            <Form.Label>Check-out</Form.Label>
            <Form.Control
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTipoHabitacion">
            <Form.Label>Tipo de Habitación</Form.Label>
            <Form.Control
  as="select"
  value={tipoHabitacion}
  onChange={(e) => setTipoHabitacion(Number(e.target.value))} // Asegúrate de convertir a número
>
  <option value="1">Doble</option>
  <option value="2">Junior Suite</option>
  <option value="3">Suite</option>
  <option value="4">Gran Suite</option>
</Form.Control>

          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReservationPage;