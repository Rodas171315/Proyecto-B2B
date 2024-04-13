package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class ComentarioRepositorio implements PanacheRepository<Comentario> {


    public List<Comentario> findByHabitacionId(Long idHabitacion) {
        return find("id_habitacion", idHabitacion).list();
    }

    public List<Comentario> findByUsuarioId(Long idUsuario) {
        return find("id_usuario", idUsuario).list();
    }

    public Comentario findById(Long id) {
        return find("id_comentario", id).firstResult();
    }

    public void agregarComentario(Comentario comentario) {
        persist(comentario);
    }

    public Comentario actualizarComentario(Long id, Comentario datosActualizados) {
        Comentario comentarioExistente = findById(id);
        if (comentarioExistente != null) {
            comentarioExistente.setTextoComentario(datosActualizados.getTextoComentario());
            comentarioExistente.setRating(datosActualizados.getRating());
            comentarioExistente.setFechaComentario(datosActualizados.getFechaComentario());
            comentarioExistente.setIdComentarioPadre(datosActualizados.getIdComentarioPadre());
            persist(comentarioExistente);
            return comentarioExistente;
        }
        return null;
    }

    
    public boolean eliminarComentario(Long id) {
        return deleteById(id);
    }

    
}
