package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;

public class UsuarioCreacionDTOTest {

    private UsuarioCreacionDTO usuarioDTO;

    @BeforeEach
    public void setUp() {
        usuarioDTO = new UsuarioCreacionDTO();
    }

    @Test
    public void testSetAndGetEmail() {
        String email = "usuario@example.com";
        usuarioDTO.setEmail(email);
        Assertions.assertEquals(email, usuarioDTO.getEmail());
    }

    @Test
    public void testSetAndGetPassword() {
        String password = "passwordSeguro123";
        usuarioDTO.setPassword(password);
        Assertions.assertEquals(password, usuarioDTO.getPassword());
    }

    @Test
    public void testSetAndGetRol() {
        int rol = 1;
        usuarioDTO.setRol(rol);
        Assertions.assertEquals(rol, usuarioDTO.getRol());
    }

    @Test
    public void testSetAndGetPrimerNombre() {
        String primerNombre = "Juan";
        usuarioDTO.setPrimerNombre(primerNombre);
        Assertions.assertEquals(primerNombre, usuarioDTO.getPrimerNombre());
    }

    @Test
    public void testSetAndGetSegundoNombre() {
        String segundoNombre = "Carlos";
        usuarioDTO.setSegundoNombre(segundoNombre);
        Assertions.assertEquals(segundoNombre, usuarioDTO.getSegundoNombre());
    }

    @Test
    public void testSetAndGetPrimerApellido() {
        String primerApellido = "Pérez";
        usuarioDTO.setPrimerApellido(primerApellido);
        Assertions.assertEquals(primerApellido, usuarioDTO.getPrimerApellido());
    }

    @Test
    public void testSetAndGetSegundoApellido() {
        String segundoApellido = "Gómez";
        usuarioDTO.setSegundoApellido(segundoApellido);
        Assertions.assertEquals(segundoApellido, usuarioDTO.getSegundoApellido());
    }

    @Test
    public void testSetAndGetFechaNacimiento() {
        LocalDate fechaNacimiento = LocalDate.of(1990, 1, 1);
        usuarioDTO.setFechaNacimiento(fechaNacimiento);
        Assertions.assertEquals(fechaNacimiento, usuarioDTO.getFechaNacimiento());
    }

    @Test
    public void testSetAndGetNacionalidad() {
        String nacionalidad = "Mexicana";
        usuarioDTO.setNacionalidad(nacionalidad);
        Assertions.assertEquals(nacionalidad, usuarioDTO.getNacionalidad());
    }

    @Test
    public void testSetAndGetPasaporte() {
        Long pasaporte = 123456789L;
        usuarioDTO.setPasaporte(pasaporte);
        Assertions.assertEquals(pasaporte, usuarioDTO.getPasaporte());
    }

    @Test
    public void testSetAndGetRecaptchaToken() {
        String recaptchaToken = "03AGdBq25-k_JsomethingT0";
        usuarioDTO.setRecaptchaToken(recaptchaToken);
        Assertions.assertEquals(recaptchaToken, usuarioDTO.getRecaptchaToken());
    }
}

