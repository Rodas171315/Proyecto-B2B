package pack_agencia;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import jakarta.inject.Inject;

/**
 * Servicio REST para la gestión de paquetes de viaje.
 * Proporciona endpoints para crear, listar, obtener, actualizar y eliminar paquetes.
 */
@Path("/paquetes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PaquetesService {

    @Inject
    PaquetesRepository paquetesRepository;

    /**
     * Crea un nuevo paquete de viaje.
     * @param paquete Objeto Paquetes que contiene la información del paquete a crear.
     * @return Un Response con el paquete creado y un estado HTTP CREATED.
     */
    @POST
    @Transactional
    public Response createPaquete(Paquetes paquete) {
        System.out.println("Recibiendo paquete completo: " + paquete.getNombrePaquete());
        paquetesRepository.persist(paquete);
        return Response.status(Response.Status.CREATED).entity(paquete).build();
    }

    /**
     * Lista todos los paquetes disponibles.
     * @return Un Response con una lista de todos los paquetes.
     */
    @GET
    public Response listPaquetes() {
        return Response.ok(paquetesRepository.listAll()).build();
    }

    /**
     * Obtiene un paquete por su identificador.
     * @param id El identificador del paquete.
     * @return Un Response con el paquete encontrado o un estado HTTP NOT FOUND.
     */
    @GET
    @Path("{id}")
    public Response getPaquete(@PathParam("id") Long id) {
        Paquetes paquete = paquetesRepository.findById(id);
        if (paquete == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(paquete).build();
    }

    /**
     * Obtiene todos los paquetes asociados a un usuario específico.
     * @param userId El identificador del usuario.
     * @return Un Response con la lista de paquetes o un estado HTTP NOT FOUND si no se encuentra ninguno.
     */
    @GET
    @Path("/usuario/{userId}")
    public Response getPaquetesPorUsuario(@PathParam("userId") Long userId) {
        List<Paquetes> paquetes = paquetesRepository.find("idUsuario", userId).list();
        if (paquetes.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(paquetes).build();
    }

    /**
     * Actualiza el estado de un paquete.
     * @param id El identificador del paquete.
     * @param paquete Objeto Paquetes con el nuevo estado.
     * @return Un Response con el paquete actualizado o un estado HTTP NOT FOUND.
     */
    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateEstadoPaquete(@PathParam("id") Long id, Paquetes paquete) {
        Paquetes paqueteExistente = paquetesRepository.findById(id);
        if (paqueteExistente != null) {
            paqueteExistente.setEstadoPaquete(paquete.getEstadoPaquete());
            paqueteExistente.setIdUsuario(paquete.getIdUsuario());
            paqueteExistente.setIdReservaHabitacion(paquete.getIdReservaHabitacion());
            paqueteExistente.setIdBoleto(paquete.getIdBoleto());
            paquetesRepository.persist(paqueteExistente);
            return Response.ok(paqueteExistente).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    /**
     * Cancela un paquete específico, cambiando su estado a cancelado.
     * @param id El identificador del paquete a cancelar.
     * @param paquete Objeto Paquetes con el nuevo estado de cancelación.
     * @return Un Response con el paquete cancelado o un estado HTTP NOT FOUND.
     */
    @PUT
    @Path("/cancelar/{id}")
    @Transactional
    public Response cancelarEstadoPaquete(@PathParam("id") Long id, Paquetes paquete) {
        Paquetes paqueteExistente = paquetesRepository.findById(id);
        if (paqueteExistente != null) {
            paqueteExistente.setEstadoPaquete(paquete.getEstadoPaquete());
            paquetesRepository.persist(paqueteExistente);
            return Response.ok(paqueteExistente).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    /**
     * Elimina un paquete por su identificador.
     * @param id El identificador del paquete a eliminar.
     * @return Un Response con estado HTTP NO CONTENT si se eliminó correctamente o NOT FOUND si no se encuentra.
     */
    @DELETE
    @Path("{id}")
    @Transactional
    public Response deletePaquete(@PathParam("id") Long id) {
        boolean deleted = paquetesRepository.deleteById(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}








