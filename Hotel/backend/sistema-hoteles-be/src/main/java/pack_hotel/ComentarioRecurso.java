package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/comentarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class ComentarioRecurso {

    @Inject
    private ComentarioRepositorio comentarioRepositorio;

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

    @POST
    public Response crearComentario(Comentario comentario) {
        if (comentario.getIdHabitacion() == null || comentario.getIdUsuario() == null || comentario.getTextoComentario() == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Los campos idHabitacion, idUsuario y textoComentario son obligatorios").build();
        }
        comentarioRepositorio.persist(comentario);
        return Response.status(Response.Status.CREATED).entity(comentario).build();
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
public List<Comentario> obtenerComentariosPorHabitacion(@PathParam("idHabitacion") Long idHabitacion) {
    // Implementa la lógica para filtrar comentarios por el ID de la habitación
    // Esto puede involucrar una consulta a la base de datos que filtre por idHabitacion
    return comentarioRepositorio.findByHabitacionId(idHabitacion);
}


}
