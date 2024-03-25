import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditReservationPage = ({ show, handleClose, reserva, actualizarReserva }) => {
    // State for input fields
    const [checkIn, setCheckIn] = useState(reserva.fechaIngreso);
    const [checkOut, setCheckOut] = useState(reserva.fechaSalida);
    const [tipoHabitacion, setTipoHabitacion] = useState(reserva.tipoHabitacion.toString());

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the updated reservation object, od
        const reservaActualizada = {
            ...reserva,
            fechaIngreso: checkIn,
            fechaSalida: checkOut,
            tipoHabitacion: Number(tipoHabitacion), // tipoHabitacion as a number
        };

        console.log('Enviando reserva actualizada:', reservaActualizada);
        try {
            // Use the actualizarReserva function passed via props
            await actualizarReserva(reservaActualizada);
            handleClose(); // Close the modal upon successful update
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
                            onChange={(e) => setTipoHabitacion(e.target.value)}
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
