package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class AerolineasTest {

    @Test
    public void testSetAndGetId() {
        Aerolineas aerolinea = new Aerolineas();
        aerolinea.setId(1L);
        Assertions.assertEquals(1L, aerolinea.getId());
    }

    @Test
    public void testSetAndGetNombre() {
        Aerolineas aerolinea = new Aerolineas();
        aerolinea.setNombre("Quarkus Airways");
        Assertions.assertEquals("Quarkus Airways", aerolinea.getNombre());
    }

    @Test
    public void testSetAndGetDescripcion() {
        Aerolineas aerolinea = new Aerolineas();
        aerolinea.setDescripcion("Una descripción");
        Assertions.assertEquals("Una descripción", aerolinea.getDescripcion());
    }
}

