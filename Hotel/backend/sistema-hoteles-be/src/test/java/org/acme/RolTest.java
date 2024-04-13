package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RolTest {

    private Rol rol;

    @BeforeEach
    public void setUp() {
        rol = new Rol();
    }

    @Test
    public void testSetAndGetIdRol() {
        Long idRol = 1L;
        rol.setIdRol(idRol);
        Assertions.assertEquals(idRol, rol.getIdRol());
    }

    @Test
    public void testSetAndGetTipo() {
        String tipo = "ADMIN";
        rol.setTipo(tipo);
        Assertions.assertEquals(tipo, rol.getTipo());
    }
}
