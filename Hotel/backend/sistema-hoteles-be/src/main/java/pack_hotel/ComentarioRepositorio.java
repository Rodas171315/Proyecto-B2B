package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class ComentarioRepositorio implements PanacheRepository<Comentario> {

    // Método para encontrar comentarios por el ID de la habitación
    public List<Comentario> findByHabitacionId(Long idHabitacion) {
        return find("id_habitacion", idHabitacion).list();
    }

    // Método para buscar comentarios de un usuario específico
    public List<Comentario> findByUsuarioId(Long idUsuario) {
        return find("id_usuario", idUsuario).list();
    }

    // Método para encontrar un comentario específico por su ID
    public Comentario findById(Long id) {
        return find("id_comentario", id).firstResult();
    }

    // Método para agregar un nuevo comentario
    public void agregarComentario(Comentario comentario) {
        persist(comentario);
    }

    // Método para actualizar un comentario existente
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

    // Método para eliminar un comentario
    public boolean eliminarComentario(Long id) {
        return deleteById(id);
    }

    
}
