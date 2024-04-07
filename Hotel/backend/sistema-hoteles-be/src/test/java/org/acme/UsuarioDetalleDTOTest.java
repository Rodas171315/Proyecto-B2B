package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;

public class UsuarioDetalleDTOTest {

    private UsuarioDetalleDTO usuarioDetalleDTO;

    @BeforeEach
    public void setUp() {
        usuarioDetalleDTO = new UsuarioDetalleDTO();
    }

    @Test
    public void testSetAndGetId() {
        Long id = 1L;
        usuarioDetalleDTO.setId(id);
        Assertions.assertEquals(id, usuarioDetalleDTO.getId());
    }

    @Test
    public void testSetAndGetRolNombre() {
        String rolNombre = "Administrador";
        usuarioDetalleDTO.setRolNombre(rolNombre);
        Assertions.assertEquals(rolNombre, usuarioDetalleDTO.getRolNombre());
    }

    @Test
    public void testSetAndGetEmail() {
        String email = "usuario@example.com";
        usuarioDetalleDTO.setEmail(email);
        Assertions.assertEquals(email, usuarioDetalleDTO.getEmail());
    }

    @Test
    public void testSetAndGetPrimerNombre() {
        String primerNombre = "Juan";
        usuarioDetalleDTO.setPrimerNombre(primerNombre);
        Assertions.assertEquals(primerNombre, usuarioDetalleDTO.getPrimerNombre());
    }

    @Test
    public void testSetAndGetSegundoNombre() {
        String segundoNombre = "Carlos";
        usuarioDetalleDTO.setSegundoNombre(segundoNombre);
        Assertions.assertEquals(segundoNombre, usuarioDetalleDTO.getSegundoNombre());
    }

    @Test
    public void testSetAndGetPrimerApellido() {
        String primerApellido = "Pérez";
        usuarioDetalleDTO.setPrimerApellido(primerApellido);
        Assertions.assertEquals(primerApellido, usuarioDetalleDTO.getPrimerApellido());
    }

    @Test
    public void testSetAndGetSegundoApellido() {
        String segundoApellido = "Gómez";
        usuarioDetalleDTO.setSegundoApellido(segundoApellido);
        Assertions.assertEquals(segundoApellido, usuarioDetalleDTO.getSegundoApellido());
    }

    @Test
    public void testSetAndGetFechaNacimiento() {
        LocalDate fechaNacimiento = LocalDate.of(1990, 1, 1);
        usuarioDetalleDTO.setFechaNacimiento(fechaNacimiento);
        Assertions.assertEquals(fechaNacimiento, usuarioDetalleDTO.getFechaNacimiento());
    }

    @Test
    public void testSetAndGetNacionalidad() {
        String nacionalidad = "Mexicana";
        usuarioDetalleDTO.setNacionalidad(nacionalidad);
        Assertions.assertEquals(nacionalidad, usuarioDetalleDTO.getNacionalidad());
    }

    @Test
    public void testSetAndGetPasaporte() {
        Long pasaporte = 123456789L;
        usuarioDetalleDTO.setPasaporte(pasaporte);
        Assertions.assertEquals(pasaporte, usuarioDetalleDTO.getPasaporte());
    }
}

