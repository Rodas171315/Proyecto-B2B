package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

/**
 * Repositorio para gestionar las operaciones de base de datos de los comentarios.
 */
@ApplicationScoped
public class ComentarioRepositorio implements PanacheRepository<Comentario> {

    /**
     * Encuentra comentarios por el ID de la habitación.
     *
     * @param idHabitacion El ID de la habitación.
     * @return Lista de comentarios asociados con la habitación especificada.
     */
    public List<Comentario> findByHabitacionId(Long idHabitacion) {
        return find("id_habitacion", idHabitacion).list();
    }

    /**
     * Encuentra comentarios por el ID del usuario.
     *
     * @param idUsuario El ID del usuario.
     * @return Lista de comentarios hechos por el usuario especificado.
     */
    public List<Comentario> findByUsuarioId(Long idUsuario) {
        return find("id_usuario", idUsuario).list();
    }

    /**
     * Busca un comentario específico por su ID.
     *
     * @param id El ID del comentario.
     * @return El comentario encontrado o null si no existe.
     */
    public Comentario findById(Long id) {
        return find("id_comentario", id).firstResult();
    }

    /**
     * Agrega un nuevo comentario a la base de datos.
     *
     * @param comentario El comentario a persistir.
     */
    public void agregarComentario(Comentario comentario) {
        persist(comentario);
    }

    /**
     * Actualiza un comentario existente con nuevos datos.
     *
     * @param id El ID del comentario a actualizar.
     * @param datosActualizados Los datos actualizados del comentario.
     * @return El comentario actualizado o null si no se encontró el comentario original.
     */
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

    /**
     * Elimina un comentario de la base de datos.
     *
     * @param id El ID del comentario a eliminar.
     * @return true si el comentario fue eliminado exitosamente, false en caso contrario.
     */
    public boolean eliminarComentario(Long id) {
        return deleteById(id);
    }

}

