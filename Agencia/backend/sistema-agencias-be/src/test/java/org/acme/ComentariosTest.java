package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import java.util.Collections;

public class ComentariosTest {

    private Comentarios comentario;

    @BeforeEach
    public void setUp() {
        comentario = new Comentarios();
    }

    @Test
    public void testSetAndGetId() {
        comentario.setId(1L);
        Assertions.assertEquals(1L, comentario.getId());
    }

    @Test
    public void testSetAndGetUsuario() {
        Usuarios usuario = new Usuarios(); 
        usuario.setId(1L); 
        comentario.setUsuario(usuario);
        Assertions.assertEquals(usuario, comentario.getUsuario());
    }

    @Test
    public void testSetAndGetComentario() {
        String textoComentario = "Este es un comentario de prueba";
        comentario.setComentario(textoComentario);
        Assertions.assertEquals(textoComentario, comentario.getComentario());
    }

    @Test
    public void testSetAndGetParent() {
        Comentarios parent = new Comentarios();
        parent.setId(2L);
        comentario.setParent(parent);
        Assertions.assertEquals(parent, comentario.getParent());
    }

    @Test
    public void testSetAndGetReplies() {
        Comentarios reply = new Comentarios();
        reply.setId(3L);
        comentario.setReplies(Collections.singletonList(reply));
        Assertions.assertFalse(comentario.getReplies().isEmpty());
        Assertions.assertEquals(reply, comentario.getReplies().get(0));
    }

    @Test
    public void testSetAndGetFechaCreacion() {
        LocalDateTime now = LocalDateTime.now();
        comentario.setFechaCreacion(now);
        Assertions.assertEquals(now, comentario.getFechaCreacion());
    }
}