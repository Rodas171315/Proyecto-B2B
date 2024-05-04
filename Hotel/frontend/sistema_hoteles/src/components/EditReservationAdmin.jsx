import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditReservationAdmin = ({ show, handleClose, reserva, actualizarReserva }) => {
    const [checkIn, setCheckIn] = useState(reserva.fechaIngreso);
    const [checkOut, setCheckOut] = useState(reserva.fechaSalida);
    const [tipoHabitacion, setTipoHabitacion] = useState(reserva.tipoHabitacion.toString());
    const [tiposHabitacionDisponibles, setTiposHabitacionDisponibles] = useState([]);

    // Mapeo de IDs a nombres de tipos de habitación, esta parte está correcta.
    const translateTipoHabitacion = {
        '1': 'Doble',
        '2': 'Junior Suite',
        '3': 'Suite',
        '4': 'Gran Suite',
    };

    useEffect(() => {
        console.log(`Modal show: ${show}, hotelId: ${reserva?.idHotel}, idHabitacion: ${reserva?.idHabitacion}`);
        
        const fetchTiposHabitacion = async () => {
            if (show && reserva?.idHotel) {
                try {
                    const url = `http://localhost:8080/reservas/tipos-habitacion-por-hotel?hotelId=${reserva.idHotel}`;
                    console.log(`Fetching room types with url: ${url}`);
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const tipos = await response.json();
                    console.log('Tipos de habitación recibidos:', tipos);
                    setTiposHabitacionDisponibles(tipos);
                } catch (error) {
                    console.error('Error al obtener tipos de habitación:', error);
                }
            } else {
                console.log('No se hará fetch porque el modal está cerrado o no se ha definido idHotel.');
            }
        };

        fetchTiposHabitacion();
    }, [show, reserva?.idHotel, reserva?.idHabitacion]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submit de la reserva actualizada con id:', reserva.idReserva);

        const reservaActualizada = {
            ...reserva,
            fechaIngreso: checkIn,
            fechaSalida: checkOut,
            tipoHabitacion: Number(tipoHabitacion),
        };

        console.log('Reserva actualizada a enviar:', reservaActualizada);
        
        try {
            await actualizarReserva(reservaActualizada);
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
                            onChange={(e) => setTipoHabitacion(e.target.value)}
                        >
                            {tiposHabitacionDisponibles.map((tipoId) => (
                                <option key={tipoId} value={tipoId}>
                                    {translateTipoHabitacion[tipoId]} {/* Aquí se corrigió el acceso a los valores del objeto */}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Guardar Cambios</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default EditReservationAdmin;