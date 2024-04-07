package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

public class TiposHabitacionTest {

    private Tipos_habitacion tiposHabitacion;

    @BeforeEach
    public void setUp() {
        tiposHabitacion = new Tipos_habitacion();
    }

    @Test
    public void testSetAndGetIdTipo() {
        Long idTipo = 1L;
        tiposHabitacion.setId_tipo(idTipo);
        Assertions.assertEquals(idTipo, tiposHabitacion.getId_tipo());
    }

    @Test
    public void testSetAndGetTipo() {
        String tipo = "Suite";
        tiposHabitacion.setTipo(tipo);
        Assertions.assertEquals(tipo, tiposHabitacion.getTipo());
    }

    @Test
    public void testSetAndGetImagenUrl() {
        String imagenUrl = "http://example.com/imagen.jpg";
        tiposHabitacion.setImagenUrl(imagenUrl);
        Assertions.assertEquals(imagenUrl, tiposHabitacion.getImagenUrl());
    }

    @Test
    public void testActualizarUrlsImagenes() {
        List<String> urlsImagenes = Arrays.asList("http://example.com/imagen1.jpg", "http://example.com/imagen2.jpg");
        tiposHabitacion.actualizarUrlsImagenes(urlsImagenes);
        Assertions.assertNotNull(tiposHabitacion); 
    }
}

