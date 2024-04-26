package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/faqs")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FaqsRecurso {

    @Inject
    FaqsRepositorio repo;

    @GET
    public List<Faqs> listar() {
        return repo.listAll();
    }

    @POST
    @Transactional
    public Faqs crear(Faqs faq) {
        repo.persist(faq);
        return faq;
    }

    @GET
    @Path("/{id}")
    public Faqs obtenerPorId(@PathParam("id") Long id) {
        return repo.findByIdOptional(id)
            .orElseThrow(() -> new WebApplicationException("Faq con id " + id + " no encontrada", Response.Status.NOT_FOUND));
    }

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