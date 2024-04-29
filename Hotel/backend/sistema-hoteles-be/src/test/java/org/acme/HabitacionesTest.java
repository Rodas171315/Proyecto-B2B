package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class HabitacionesTest {

    private Habitaciones habitacion;

    @BeforeEach
    public void setUp() {
        habitacion = new Habitaciones();
    }

    @Test
    public void testSetAndGetIdHabitacion() {
        Long idHabitacion = 1L;
        habitacion.setId_habitacion(idHabitacion);
        Assertions.assertEquals(idHabitacion, habitacion.getId_habitacion());
    }

    @Test
    public void testSetAndGetIdHotel() {
        Long idHotel = 2L;
        habitacion.setId_hotel(idHotel);
        Assertions.assertEquals(idHotel, habitacion.getId_hotel());
    }

    @Test
    public void testSetAndGetDisponible() {
        habitacion.setDisponible(true);
        Assertions.assertTrue(habitacion.isDisponible());
        habitacion.setDisponible(false);
        Assertions.assertFalse(habitacion.isDisponible());
    }

    @Test
    public void testSetAndGetNumeroHabitacion() {
        int numero = 101;
        habitacion.setNumero_habitacion(numero);
        Assertions.assertEquals(numero, habitacion.getNumero_habitacion());
    }

    @Test
    public void testSetAndGetCapacidadPersonas() {
        int capacidad = 4;
        habitacion.setCapacidad_personas(capacidad);
        Assertions.assertEquals(capacidad, habitacion.getCapacidad_personas());
    }

    @Test
    public void testSetAndGetTipoHabitacion() {
        Integer tipo = 1;
        habitacion.setTipo_habitacion(tipo);
        Assertions.assertEquals(tipo, habitacion.getTipo_habitacion());
    }

    @Test
    public void testSetAndGetPrecioxpersona() {
        double precio = 150.0;
        habitacion.setPrecioxpersona(precio);
        Assertions.assertEquals(precio, habitacion.getPrecioxpersona());
    }

    @Test
    public void testSetAndGetPrecioxnoche() {
        double precio = 300.0;
        habitacion.setPrecioxnoche(precio);
        Assertions.assertEquals(precio, habitacion.getPrecioxnoche());
    }

    @Test
    public void testSetAndGetValuacion() {
        int valuacion = 5;
        habitacion.setValuacion(valuacion);
        Assertions.assertEquals(valuacion, habitacion.getValuacion());
    }
}