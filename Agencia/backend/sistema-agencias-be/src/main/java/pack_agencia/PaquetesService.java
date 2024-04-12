package pack_agencia;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import jakarta.inject.Inject;

@Path("/paquetes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PaquetesService {

    @Inject
    PaquetesRepository paquetesRepository;

    @POST
    @Transactional
    public Response createPaquete(Paquetes paquete) {
        System.out.println("Recibiendo paquete: " + paquete.getNombrePaquete());
        paquetesRepository.persist(paquete);
        return Response.status(Response.Status.CREATED).entity(paquete).build();
    }

    @GET
    public Response listPaquetes() {
        return Response.ok(paquetesRepository.listAll()).build();
    }

    @GET
    @Path("{id}")
    public Response getPaquete(@PathParam("id") Long id) {
        Paquetes paquete = paquetesRepository.findById(id);
        if (paquete == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(paquete).build();
    }

    @GET
    @Path("/usuario/{userId}")
    public Response getPaquetesPorUsuario(@PathParam("userId") Long userId) {
        List<Paquetes> paquetes = paquetesRepository.find("idUsuario", userId).list();
        if (paquetes.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(paquetes).build();
    }

    
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







