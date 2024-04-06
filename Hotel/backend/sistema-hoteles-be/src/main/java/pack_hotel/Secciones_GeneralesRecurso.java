package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/secciones-generales")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class Secciones_GeneralesRecurso {

    @Inject
    Secciones_GeneralesRepositorio repo;

    @GET
    public List<Secciones_Generales> listar() {
        return repo.listAll();
    }

    @POST
    @Transactional
    public Secciones_Generales crear(Secciones_Generales seccion) {
        repo.persist(seccion);
        return seccion;
    }

    @GET
    @Path("/{id}")
    public Secciones_Generales obtenerPorId(@PathParam("id") Long id) {
        return repo.findByIdOptional(id)
            .orElseThrow(() -> new WebApplicationException("Sección general con id " + id + " no encontrada", Response.Status.NOT_FOUND));
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Secciones_Generales actualizar(@PathParam("id") Long id, Secciones_Generales seccionActualizada) {
        Secciones_Generales seccion = repo.findByIdOptional(id)
            .orElseThrow(() -> new WebApplicationException("Sección general con id " + id + " no encontrada", Response.Status.NOT_FOUND));
        seccion.setTitulo(seccionActualizada.getTitulo());
        seccion.setContenido(seccionActualizada.getContenido());
        return seccion;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response eliminar(@PathParam("id") Long id) {
        boolean eliminado = repo.deleteById(id);
        if (!eliminado) {
            throw new WebApplicationException("Sección general con id " + id + " no encontrada o no pudo ser eliminada", Response.Status.NOT_FOUND);
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}