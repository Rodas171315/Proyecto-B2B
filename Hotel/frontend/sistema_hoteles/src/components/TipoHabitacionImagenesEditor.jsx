import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// Objeto para mapear los IDs a nombres legibles
const tipoHabitacionNombres = {
    1: 'Doble',
    2: 'Junior Suite',
    3: 'Suite',
    4: 'Gran Suite',
};



const TipoHabitacionImagenesEditor = ({ idTipoHabitacion }) => {
    const [imagenUrl, setImagenUrl] = useState('');
    const [nuevaImagen, setNuevaImagen] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarImagen = async () => {
            try {
                const response = await fetch(`http://localhost:8080/tipos_habitacion/${idTipoHabitacion}`);
                if (!response.ok) throw new Error('Error al cargar la imagen');
                const data = await response.json();
                setImagenUrl(data.imagenUrl || 'URL por defecto');
            } catch (error) {
                setError('Error al cargar la imagen: ' + error.message);
            }
        };

        if (idTipoHabitacion) cargarImagen();
    }, [idTipoHabitacion]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nuevaImagen) return;
    
        try {
            await fetch(`http://localhost:8080/tipos_habitacion/${idTipoHabitacion}`, {
                method: 'PUT', // Cambio crítico aquí
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imagenUrl: nuevaImagen }),
            });
    
            setImagenUrl(nuevaImagen);
            setNuevaImagen('');
        } catch (error) {
            setError('Error al actualizar la imagen: ' + error.message);
        }
    };
    

    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            <h5>Tipo de Habitación: {tipoHabitacionNombres[idTipoHabitacion]}</h5> {/* Cambio aquí */}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Añadir/Actualizar Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="URL de la nueva imagen"
                        value={nuevaImagen}
                        onChange={e => setNuevaImagen(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">Actualizar Imagen</Button>
            </Form>
            {imagenUrl && (
                <div style={{ marginTop: '10px' }}>
                    <img src={imagenUrl} alt={`Imagen del tipo de habitación ${tipoHabitacionNombres[idTipoHabitacion]}`} style={{ width: '400px', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};

export default TipoHabitacionImagenesEditor;
