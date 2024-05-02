package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 * Clase de recursos que proporciona endpoints para operaciones CRUD sobre secciones generales.
 * Esta clase maneja la creación, lectura, actualización y eliminación de secciones generales.
 */
@Path("/secciones-generales")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class Secciones_GeneralesRecurso {

    @Inject
    Secciones_GeneralesRepositorio repo;

    /**
     * Obtiene y devuelve todas las secciones generales almacenadas en la base de datos.
     * @return una lista de todas las secciones generales.
     */
    @GET
    public List<Secciones_Generales> listar() {
        return repo.listAll();
    }

    /**
     * Crea una nueva sección general en la base de datos.
     * @param seccion Objeto de Secciones_Generales que contiene la información de la nueva sección.
     * @return la sección general recién creada.
     */
    @POST
    @Transactional
    public Secciones_Generales crear(Secciones_Generales seccion) {
        repo.persist(seccion);
        return seccion;
    }

    /**
     * Recupera una sección general por su identificador único.
     * @param id El identificador de la sección general a recuperar.
     * @return la sección general encontrada.
     * @throws WebApplicationException si la sección no se encuentra.
     */
    @GET
    @Path("/{id}")
    public Secciones_Generales obtenerPorId(@PathParam("id") Long id) {
        return repo.findByIdOptional(id)
            .orElseThrow(() -> new WebApplicationException("Sección general con id " + id + " no encontrada", Response.Status.NOT_FOUND));
    }


    /**
     * Actualiza la información de una sección general existente.
     * @param id El ID de la sección general a actualizar.
     * @param seccionActualizada Datos actualizados de la sección general.
     * @return la sección general actualizada.
     * @throws WebApplicationException si la sección no se encuentra.
     */
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

        /**
     * Elimina una sección general por su ID.
     * @param id El ID de la sección general a eliminar.
     * @return una respuesta indicando que no hay contenido si la eliminación fue exitosa.
     * @throws WebApplicationException si la sección no se encuentra o no pudo ser eliminada.
     */
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