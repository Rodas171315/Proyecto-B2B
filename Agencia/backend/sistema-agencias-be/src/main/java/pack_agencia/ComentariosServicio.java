package pack_agencia;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 * Servicio REST para gestionar comentarios.
 * Proporciona funcionalidades CRUD a través de endpoints HTTP para interactuar con la entidad Comentarios.
 */
@Path("/comentarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ComentariosServicio {

    @Inject
    ComentariosRepositorio comentariosRepositorio;

    /**
     * Lista todos los comentarios existentes.
     * @return lista de comentarios
     */
    @GET
    public List<Comentarios> listarTodosLosComentarios() {
        return comentariosRepositorio.listAll();
    }

    /**
     * Crea un nuevo comentario.
     * @param comentario objeto Comentarios a persistir
     * @return respuesta HTTP con el resultado de la operación
     */
    @POST
    @Transactional
    public Response crearComentario(Comentarios comentario) {
        comentariosRepositorio.persist(comentario);
        if (comentario.isPersistent()) {
            return Response.status(Response.Status.CREATED).entity(comentario).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    /**
     * Obtiene un comentario por su identificador.
     * @param id identificador del comentario
     * @return respuesta HTTP con el comentario encontrado o un mensaje de error si no se encuentra
     */
    @GET
    @Path("/{id}")
    public Response obtenerComentarioPorId(@PathParam("id") Long id) {
        Comentarios comentario = comentariosRepositorio.findById(id);
        if (comentario != null) {
            return Response.ok(comentario).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    /**
     * Actualiza un comentario existente basado en su identificador.
     * @param id identificador del comentario a actualizar
     * @param datosComentario datos actualizados del comentario
     * @return respuesta HTTP con el comentario actualizado o un mensaje de error si no se encuentra
     */
    @PUT
    @Path("/{id}")
    @Transactional
    public Response actualizarComentario(@PathParam("id") Long id, Comentarios datosComentario) {
        Comentarios comentarioExistente = comentariosRepositorio.findById(id);
        if (comentarioExistente != null) {
            comentarioExistente.setComentario(datosComentario.getComentario());
            return Response.ok(comentarioExistente).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    /**
     * Elimina un comentario basado en su identificador.
     * @param id identificador del comentario a eliminar
     * @return respuesta HTTP indicando si el comentario fue eliminado con éxito o no
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response eliminarComentario(@PathParam("id") Long id) {
        boolean eliminado = comentariosRepositorio.deleteById(id);
        if (eliminado) {
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    /**
     * Permite responder a un comentario existente.
     * @param parentId identificador del comentario al que se responde
     * @param comentario respuesta al comentario padre
     * @return respuesta HTTP con el comentario creado o un mensaje de error si el comentario padre no existe
     */
    @POST
    @Path("/{id}/responder")
    @Transactional
    public Response responderAComentario(@PathParam("id") Long parentId, Comentarios comentario) {
        Comentarios parent = comentariosRepositorio.findById(parentId);
        if (parent == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        comentario.setParent(parent);
        comentariosRepositorio.persist(comentario);
        return Response.status(Response.Status.CREATED).entity(comentario).build();
    }
}


