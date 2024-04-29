package pack_agencia;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.inject.Inject;
import java.util.List;
import jakarta.ws.rs.core.Response;


@Path("/aerolineas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AerolineasService {

    @Inject
    AerolineaRepository aerolineaRepository; 

    @GET
    public List<Aerolineas> listarAerolineas() {
        return aerolineaRepository.listAll();
    }

    @POST
    @Transactional
    public Aerolineas crearAerolinea(Aerolineas aerolinea) {
        aerolineaRepository.persist(aerolinea);
        return aerolinea;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Aerolineas actualizarAerolinea(@PathParam("id") Long id, Aerolineas detallesAerolinea) {
        Aerolineas aerolineaExistente = aerolineaRepository.findById(id);
        if (aerolineaExistente != null) {
            aerolineaExistente.setNombre(detallesAerolinea.getNombre());
            aerolineaExistente.setDescripcion(detallesAerolinea.getDescripcion());
            return aerolineaExistente;
        }
        throw new WebApplicationException("Aerolínea con id " + id + " no encontrada", Response.Status.NOT_FOUND);
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void eliminarAerolinea(@PathParam("id") Long id) {
        if (!aerolineaRepository.deleteById(id)) {
            throw new WebApplicationException("Aerolínea con id " + id + " no encontrada o no se pudo eliminar", Response.Status.NOT_FOUND);
        }
    }
}


