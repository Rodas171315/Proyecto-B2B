package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    @GET
    public List<Comentario> obtenerComentarios() {
        return comentarioRepositorio.listAll();
    }



    @GET
    @Path("{id}")
    public Response obtenerComentarioPorId(@PathParam("id") Long id) {
        Comentario comentario = comentarioRepositorio.findById(id);
        if (comentario == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("No se encontró el comentario con ID: " + id).build();
        }
        return Response.ok(comentario).build();
    }
    
    

    @DELETE
    @Path("{id}")
    public Response eliminarComentario(@PathParam("id") Long id) {
        boolean deleted = comentarioRepositorio.deleteById(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).entity("No se encontró el comentario con ID: " + id).build();
        }
        return Response.ok().entity("Comentario eliminado exitosamente").build();
    }

    @PUT
    @Path("{id}")
    public Response actualizarComentario(@PathParam("id") Long id, Comentario comentario) {
        Comentario comentarioExistente = comentarioRepositorio.findById(id);
        if (comentarioExistente == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Comentario no encontrado con el ID: " + id).build();
        }

        comentarioExistente.setTextoComentario(comentario.getTextoComentario());
        comentarioExistente.setRating(comentario.getRating());
        // Agregar aquí cualquier otro campo que necesite ser actualizado
        comentarioRepositorio.persist(comentarioExistente);

        return Response.ok(comentarioExistente).build();
    }


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


    @POST
    public Response crearComentario(ComentarioDTO comentarioDto) {
        Comentario comentario = new Comentario();
        comentario.setIdHabitacion(comentarioDto.getIdHabitacion());
        comentario.setIdUsuario(comentarioDto.getIdUsuario());
        comentario.setTextoComentario(comentarioDto.getTextoComentario());
        comentario.setRating(comentarioDto.getRating());
        comentario.setIdComentarioPadre(comentarioDto.getIdComentarioPadre()); 
        comentario.setFechaComentario(LocalDateTime.now()); // esto assume la fecha actual para el comentario
        comentarioRepositorio.persist(comentario);
        
        // Calcula el promedio de los ratings para la habitación y actualiza la valuación
        actualizarValuacionHabitacion(comentario.getIdHabitacion());

        return Response.status(Response.Status.CREATED).entity(comentario).build();
    }

    private void actualizarValuacionHabitacion(Long idHabitacion) {
        List<Comentario> comentarios = comentarioRepositorio.findByHabitacionId(idHabitacion);
        double promedio = comentarios.stream()
                                      .mapToInt(Comentario::getRating)
                                      .average()
                                      .orElse(0.0);
        Habitaciones habitacion = HabitacionRepositorio.findById(idHabitacion);
        if (habitacion != null) {
            habitacion.setValuacion((int) Math.round(promedio)); // Actualiza la valuación con el promedio
            HabitacionRepositorio.persist(habitacion);
        }
    }



}
