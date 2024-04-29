package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Recurso que gestiona los comentarios relacionados con las habitaciones del hotel.
 * Proporciona funcionalidades para obtener, crear, actualizar y eliminar comentarios.
 */
@Path("/comentarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class ComentarioRecurso {

    @Inject
    private ComentarioRepositorio comentarioRepositorio;

    @Inject
    private UsuarioRepositorio UsuarioRepositorio;

    @Inject
    private HabitacionRepositorio HabitacionRepositorio;

    /**
     * Obtiene todos los comentarios.
     *
     * @return Lista de todos los comentarios.
     */
    @GET
    public List<Comentario> obtenerComentarios() {
        return comentarioRepositorio.listAll();
    }

    /**
     * Obtiene un comentario por su ID.
     *
     * @param id El ID del comentario.
     * @return Respuesta con el comentario o un mensaje de error si no se encuentra.
     */
    @GET
    @Path("{id}")
    public Response obtenerComentarioPorId(@PathParam("id") Long id) {
        Comentario comentario = comentarioRepositorio.findById(id);
        if (comentario == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("No se encontró el comentario con ID: " + id).build();
        }
        return Response.ok(comentario).build();
    }

    /**
     * Elimina un comentario por su ID.
     *
     * @param id El ID del comentario a eliminar.
     * @return Respuesta indicando el éxito o fracaso de la operación.
     */
    @DELETE
    @Path("{id}")
    public Response eliminarComentario(@PathParam("id") Long id) {
        boolean deleted = comentarioRepositorio.deleteById(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).entity("No se encontró el comentario con ID: " + id).build();
        }
        return Response.ok().entity("Comentario eliminado exitosamente").build();
    }

    /**
     * Actualiza un comentario existente.
     *
     * @param id El ID del comentario a actualizar.
     * @param comentario El comentario con los datos actualizados.
     * @return Respuesta con el comentario actualizado o un mensaje de error si no se encuentra.
     */
    @PUT
    @Path("{id}")
    public Response actualizarComentario(@PathParam("id") Long id, Comentario comentario) {
        Comentario comentarioExistente = comentarioRepositorio.findById(id);
        if (comentarioExistente == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Comentario no encontrado con el ID: " + id).build();
        }

        comentarioExistente.setTextoComentario(comentario.getTextoComentario());
        comentarioExistente.setRating(comentario.getRating());
        
        comentarioRepositorio.persist(comentarioExistente);

        return Response.ok(comentarioExistente).build();
    }

    /**
     * Obtiene comentarios por ID de habitación.
     *
     * @param idHabitacion El ID de la habitación asociada a los comentarios.
     * @return Respuesta con los comentarios de la habitación especificada.
     */
    @GET
    @Path("/por-habitacion/{idHabitacion}")
    public Response obtenerComentariosPorHabitacion(@PathParam("idHabitacion") Long idHabitacion) {
        List<Comentario> comentarios = comentarioRepositorio.findByHabitacionId(idHabitacion);
        List<ComentarioDTO> dtos = comentarios.stream().map(comentario -> {
            ComentarioDTO dto = new ComentarioDTO();
            dto.setIdComentario(comentario.getIdComentario());
            dto.setIdHabitacion(comentario.getIdHabitacion());
            dto.setTextoComentario(comentario.getTextoComentario());
            dto.setRating(comentario.getRating());
            dto.setFechaComentario(comentario.getFechaComentario());
            dto.setIdComentarioPadre(comentario.getIdComentarioPadre());

            Usuarios usuario = UsuarioRepositorio.findById(comentario.getIdUsuario());
            if (usuario != null) {
                dto.setNombreUsuario(usuario.getPrimer_nombre());
            }
            
            return dto;
        }).collect(Collectors.toList());

        return Response.ok(dtos).build();
    }

    /**
     * Crea un nuevo comentario.
     *
     * @param comentarioDto Datos del nuevo comentario.
     * @return Respuesta con el comentario creado.
     */
    @POST
    public Response crearComentario(ComentarioDTO comentarioDto) {
        Comentario comentario = new Comentario();
        comentario.setIdHabitacion(comentarioDto.getIdHabitacion());
        comentario.setIdUsuario(comentarioDto.getIdUsuario());
        comentario.setTextoComentario(comentarioDto.getTextoComentario());
        comentario.setRating(comentarioDto.getRating());
        comentario.setIdComentarioPadre(comentarioDto.getIdComentarioPadre());
        comentario.setFechaComentario(LocalDateTime.now()); // Asume la fecha actual para el comentario
        comentarioRepositorio.persist(comentario);
        
        actualizarValuacionHabitacion(comentario.getIdHabitacion());

        return Response.status(Response.Status.CREATED).entity(comentario).build();
    }

    /**
     * Actualiza la valoración promedio de una habitación basada en los comentarios.
     *
     * @param idHabitacion El ID de la habitación a actualizar.
     */
    private void actualizarValuacionHabitacion(Long idHabitacion) {
        List<Comentario> comentarios = comentarioRepositorio.findByHabitacionId(idHabitacion);
        double promedio = comentarios.stream()
                                      .mapToInt(Comentario::getRating)
                                      .average()
                                      .orElse(0.0);
        Habitaciones habitacion = HabitacionRepositorio.findById(idHabitacion);
        if (habitacion != null) {
            habitacion.setValuacion((int) Math.round(promedio));
            HabitacionRepositorio.persist(habitacion);
        }
    }
}
