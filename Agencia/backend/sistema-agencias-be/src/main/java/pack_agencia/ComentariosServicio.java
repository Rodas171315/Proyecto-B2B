package pack_agencia;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/comentarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ComentariosServicio {

    @Inject
    ComentariosRepositorio comentariosRepositorio;

    @GET
    public List<Comentarios> listarTodosLosComentarios() {
        return comentariosRepositorio.listAll();
    }

    @POST
    @Transactional
    public Response crearComentario(Comentarios comentario) {
        comentariosRepositorio.persist(comentario);
        if(comentario.isPersistent()){
            return Response.status(Response.Status.CREATED).entity(comentario).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @GET
    @Path("/{id}")
    public Response obtenerComentarioPorId(@PathParam("id") Long id) {
        Comentarios comentario = comentariosRepositorio.findById(id);
        if (comentario != null) {
            return Response.ok(comentario).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

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

