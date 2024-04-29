package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class HotelesTest {

    private Hoteles hotel;

    @BeforeEach
    public void setUp() {
        hotel = new Hoteles();
    }

    @Test
    public void testSetAndGetId() {
        hotel.setId(1L);
        Assertions.assertEquals(1L, hotel.getId());
    }

    @Test
    public void testSetAndGetNombre() {
        String nombreEsperado = "Hotel Prueba";
        hotel.setNombre(nombreEsperado);
        Assertions.assertEquals(nombreEsperado, hotel.getNombre());
    }

    @Test
    public void testSetAndGetDescripcion() {
        String descripcionEsperada = "Descripción del hotel";
        hotel.setDescripcion(descripcionEsperada);
        Assertions.assertEquals(descripcionEsperada, hotel.getDescripcion());
    }

    @Test
    public void testSetAndGetUbicacion() {
        String ubicacionEsperada = "Ubicación del hotel";
        hotel.setUbicacion(ubicacionEsperada);
        Assertions.assertEquals(ubicacionEsperada, hotel.getUbicacion());
    }
}
