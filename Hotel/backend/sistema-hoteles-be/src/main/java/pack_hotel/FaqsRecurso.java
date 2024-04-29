package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 * Recurso de servidor para manejar operaciones HTTP relacionadas con las FAQs.
 */
@Path("/faqs")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FaqsRecurso {

    @Inject
    FaqsRepositorio repo;

    /**
     * Lista todas las FAQs almacenadas en la base de datos.
     *
     * @return Una lista de FAQs.
     */
    @GET
    public List<Faqs> listar() {
        return repo.listAll();
    }

    /**
     * Crea una nueva FAQ y la persiste en la base de datos.
     *
     * @param faq La FAQ a crear.
     * @return La FAQ creada.
     */
    @POST
    @Transactional
    public Faqs crear(Faqs faq) {
        repo.persist(faq);
        return faq;
    }

    /**
     * Obtiene una FAQ por su ID.
     *
     * @param id El ID de la FAQ.
     * @return La FAQ solicitada.
     * @throws WebApplicationException Si la FAQ no se encuentra.
     */
    @GET
    @Path("/{id}")
    public Faqs obtenerPorId(@PathParam("id") Long id) {
        return repo.findByIdOptional(id)
            .orElseThrow(() -> new WebApplicationException("Faq con id " + id + " no encontrada", Response.Status.NOT_FOUND));
    }

    /**
     * Actualiza una FAQ existente.
     *
     * @param id El ID de la FAQ a actualizar.
     * @param faqActualizada Los datos actualizados de la FAQ.
     * @return La FAQ actualizada.
     * @throws WebApplicationException Si la FAQ no se encuentra.
     */
    @PUT
    @Path("/{id}")
    @Transactional
    public Faqs actualizar(@PathParam("id") Long id, Faqs faqActualizada) {
        Faqs faq = repo.findByIdOptional(id)
            .orElseThrow(() -> new WebApplicationException("Faq con id " + id + " no encontrada", Response.Status.NOT_FOUND));
        faq.setPregunta(faqActualizada.getPregunta());
        faq.setRespuesta(faqActualizada.getRespuesta());
        return faq;
    }

    /**
     * Elimina una FAQ por su ID.
     *
     * @param id El ID de la FAQ a eliminar.
     * @return Una respuesta HTTP indicando que la FAQ ha sido eliminada.
     * @throws WebApplicationException Si la FAQ no se encuentra o no pudo ser eliminada.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response eliminar(@PathParam("id") Long id) {
        boolean eliminado = repo.deleteById(id);
        if (!eliminado) {
            throw new WebApplicationException("Faq con id " + id + " no encontrada o no pudo ser eliminada", Response.Status.NOT_FOUND);
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
