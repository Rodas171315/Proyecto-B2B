package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

public class ComentarioDTOTest {

    private ComentarioDTO comentarioDTO;

    @BeforeEach
    public void setUp() {
        comentarioDTO = new ComentarioDTO();
    }

    @Test
    public void testSetAndGetIdComentario() {
        Long idComentario = 1L;
        comentarioDTO.setIdComentario(idComentario);
        Assertions.assertEquals(idComentario, comentarioDTO.getIdComentario());
    }

    @Test
    public void testSetAndGetIdHabitacion() {
        Long idHabitacion = 2L;
        comentarioDTO.setIdHabitacion(idHabitacion);
        Assertions.assertEquals(idHabitacion, comentarioDTO.getIdHabitacion());
    }

    @Test
    public void testSetAndGetIdUsuario() {
        Long idUsuario = 3L;
        comentarioDTO.setIdUsuario(idUsuario);
        Assertions.assertEquals(idUsuario, comentarioDTO.getIdUsuario());
    }

    @Test
    public void testSetAndGetTextoComentario() {
        String textoComentario = "Este es un comentario";
        comentarioDTO.setTextoComentario(textoComentario);
        Assertions.assertEquals(textoComentario, comentarioDTO.getTextoComentario());
    }

    @Test
    public void testSetAndGetRating() {
        Integer rating = 5;
        comentarioDTO.setRating(rating);
        Assertions.assertEquals(rating, comentarioDTO.getRating());
    }

    @Test
    public void testSetAndGetNombreUsuario() {
        String nombreUsuario = "Usuario Prueba";
        comentarioDTO.setNombreUsuario(nombreUsuario);
        Assertions.assertEquals(nombreUsuario, comentarioDTO.getNombreUsuario());
    }

    @Test
    public void testSetAndGetFechaComentario() {
        LocalDateTime fechaComentario = LocalDateTime.now();
        comentarioDTO.setFechaComentario(fechaComentario);
        Assertions.assertNotNull(comentarioDTO.getFechaComentario());
    }

    @Test
    public void testSetAndGetIdComentarioPadre() {
        Long idComentarioPadre = 4L;
        comentarioDTO.setIdComentarioPadre(idComentarioPadre);
        Assertions.assertEquals(idComentarioPadre, comentarioDTO.getIdComentarioPadre());
    }
}

