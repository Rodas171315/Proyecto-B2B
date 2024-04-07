package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

public class ComentarioTest {

    private Comentario comentario;

    @BeforeEach
    public void setUp() {
        comentario = new Comentario();
    }

    @Test
    public void testSetAndGetIdComentario() {
        Long idEsperado = 1L;
        comentario.setIdComentario(idEsperado);
        Assertions.assertEquals(idEsperado, comentario.getIdComentario());
    }

    @Test
    public void testSetAndGetIdHabitacion() {
        Long idHabitacion = 2L;
        comentario.setIdHabitacion(idHabitacion);
        Assertions.assertEquals(idHabitacion, comentario.getIdHabitacion());
    }

    @Test
    public void testSetAndGetIdUsuario() {
        Long idUsuario = 3L;
        comentario.setIdUsuario(idUsuario);
        Assertions.assertEquals(idUsuario, comentario.getIdUsuario());
    }

    @Test
    public void testSetAndGetTextoComentario() {
        String texto = "Excelente servicio";
        comentario.setTextoComentario(texto);
        Assertions.assertEquals(texto, comentario.getTextoComentario());
    }

    @Test
    public void testSetAndGetRating() {
        Integer rating = 5;
        comentario.setRating(rating);
        Assertions.assertEquals(rating, comentario.getRating());
    }

    @Test
    public void testSetAndGetFechaComentario() {
        LocalDateTime fecha = LocalDateTime.now();
        comentario.setFechaComentario(fecha);
        Assertions.assertEquals(fecha, comentario.getFechaComentario());
    }

    @Test
    public void testSetAndGetIdComentarioPadre() {
        Long idComentarioPadre = 4L;
        comentario.setIdComentarioPadre(idComentarioPadre);
        Assertions.assertEquals(idComentarioPadre, comentario.getIdComentarioPadre());
    }
}