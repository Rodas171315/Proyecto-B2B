package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;

public class UsuariosTest {

    private Usuarios usuario;

    @BeforeEach
    public void setUp() {
        usuario = new Usuarios();
    }

    @Test
    public void testSetAndGetId() {
        usuario.setId(1L);
        Assertions.assertEquals(1L, usuario.getId());
    }

    @Test
    public void testSetAndGetRol() {
        usuario.setRol(1);
        Assertions.assertEquals(1, usuario.getRol());
    }

    @Test
    public void testSetAndGetEmail() {
        usuario.setEmail("usuario@ejemplo.com");
        Assertions.assertEquals("usuario@ejemplo.com", usuario.getEmail());
    }

    @Test
    public void testSetAndGetPassword() {
        usuario.setPassword("contraseña");
        Assertions.assertEquals("contraseña", usuario.getPassword());
    }

    @Test
    public void testSetAndGetPrimerNombre() {
        usuario.setPrimer_nombre("Juan");
        Assertions.assertEquals("Juan", usuario.getPrimer_nombre());
    }

    @Test
    public void testSetAndGetSegundoNombre() {
        usuario.setSegundo_nombre("Carlos");
        Assertions.assertEquals("Carlos", usuario.getSegundo_nombre());
    }

    @Test
    public void testSetAndGetPrimerApellido() {
        usuario.setPrimer_apellido("Perez");
        Assertions.assertEquals("Perez", usuario.getPrimer_apellido());
    }

    @Test
    public void testSetAndGetSegundoApellido() {
        usuario.setSegundo_apellido("Gomez");
        Assertions.assertEquals("Gomez", usuario.getSegundo_apellido());
    }

    @Test
    public void testSetAndGetFechaNacimiento() {
        LocalDate fecha = LocalDate.of(1990, 1, 1);
        usuario.setFecha_nacimiento(fecha);
        Assertions.assertEquals(fecha, usuario.getFecha_nacimiento());
    }

    @Test
    public void testSetAndGetNacionalidad() {
        usuario.setNacionalidad("Mexicana");
        Assertions.assertEquals("Mexicana", usuario.getNacionalidad());
    }

    @Test
    public void testSetAndGetPasaporte() {
        usuario.setPasaporte(123456789L);
        Assertions.assertEquals(123456789L, usuario.getPasaporte());
    }
}

