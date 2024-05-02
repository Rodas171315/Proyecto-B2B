package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class UsuarioEdicionDTOTest {

    private UsuarioEdicionDTO usuarioEdicionDTO;

    @BeforeEach
    public void setUp() {
        usuarioEdicionDTO = new UsuarioEdicionDTO();
    }

    @Test
    public void testSetAndGetId() {
        Long id = 100L;
        usuarioEdicionDTO.setId(id);
        Assertions.assertEquals(id, usuarioEdicionDTO.getId());
    }

    @Test
    public void testSetAndGetRol() {
        Integer rol = 1;
        usuarioEdicionDTO.setRol(rol);
        Assertions.assertEquals(rol, usuarioEdicionDTO.getRol());
    }
}
