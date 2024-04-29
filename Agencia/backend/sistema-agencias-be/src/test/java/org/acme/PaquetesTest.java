package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PaquetesTest {

    private Paquetes paquete;

    @BeforeEach
    public void setUp() {
        paquete = new Paquetes();
    }

    @Test
    public void testSetAndGetIdPaquete() {
        paquete.setIdPaquete(1L);
        Assertions.assertEquals(1L, paquete.getIdPaquete());
    }

    @Test
    public void testSetAndGetNombrePaquete() {
        paquete.setNombrePaquete("Paquete de prueba");
        Assertions.assertEquals("Paquete de prueba", paquete.getNombrePaquete());
    }

    @Test
    public void testSetAndGetDescripcion() {
        paquete.setDescripcion("Descripción de prueba");
        Assertions.assertEquals("Descripción de prueba", paquete.getDescripcion());
    }

    @Test
    public void testSetAndGetIdHotel() {
        paquete.setIdHotel(100L);
        Assertions.assertEquals(100L, paquete.getIdHotel());
    }

    @Test
    public void testSetAndGetIdHabitacion() {
        paquete.setIdHabitacion(200L);
        Assertions.assertEquals(200L, paquete.getIdHabitacion());
    }

    @Test
    public void testSetAndGetIdVuelo() {
        paquete.setIdVuelo("V123");
        Assertions.assertEquals("V123", paquete.getIdVuelo());
    }

    @Test
    public void testSetAndGetEstadoPaquete() {
        paquete.setEstadoPaquete("Activo");
        Assertions.assertEquals("Activo", paquete.getEstadoPaquete());
    }
}