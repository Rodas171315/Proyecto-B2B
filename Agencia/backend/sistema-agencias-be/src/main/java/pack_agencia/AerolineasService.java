package pack_agencia;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.inject.Inject;
import java.util.List;
import jakarta.ws.rs.core.Response;

/**
 * Servicio REST para la gestión de aerolíneas.
 * Proporciona funcionalidades para listar, crear, actualizar y eliminar aerolíneas
 * a través de llamadas HTTP. Los métodos expuestos interactúan con {@link AerolineaRepository}
 * para realizar operaciones en la base de datos.
 *
 * @Path Define la ruta base para todos los métodos de este servicio.
 * @Produces Indica que los métodos producen respuestas en formato JSON.
 * @Consumes Indica que los métodos consumen datos en formato JSON.
 */
@Path("/aerolineas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AerolineasService {

    @Inject
    AerolineaRepository aerolineaRepository; 

    /**
     * Lista todas las aerolíneas disponibles en la base de datos.
     * @return Una lista de entidades {@link Aerolineas}.
     */
    @GET
    public List<Aerolineas> listarAerolineas() {
        return aerolineaRepository.listAll();
    }

    /**
     * Crea una nueva aerolínea en la base de datos.
     * @param aerolinea Datos de la nueva aerolínea a crear.
     * @return La entidad {@link Aerolineas} que fue creada.
     */
    @POST
    @Transactional
    public Aerolineas crearAerolinea(Aerolineas aerolinea) {
        aerolineaRepository.persist(aerolinea);
        return aerolinea;
    }

    /**
     * Actualiza la información de una aerolínea existente.
     * @param id Identificador de la aerolínea a actualizar.
     * @param detallesAerolinea Datos actualizados de la aerolínea.
     * @return La entidad {@link Aerolineas} actualizada.
     * @throws WebApplicationException Si la aerolínea con el ID especificado no existe.
     */
    @PUT
    @Path("/{id}")
    @Transactional
    public Aerolineas actualizarAerolinea(@PathParam("id") Long id, Aerolineas detallesAerolinea) {
        Aerolineas aerolineaExistente = aerolineaRepository.findById(id);
        if (aerolineaExistente != null) {
            aerolineaExistente.setNombre(detallesAerolinea.getNombre());
            aerolineaExistente.setDescripcion(detallesAerolinea.getDescripcion());
            aerolineaExistente.setUrl(detallesAerolinea.getUrl());
            return aerolineaExistente;
        }
        throw new WebApplicationException("Aerolínea con id " + id + " no encontrada", Response.Status.NOT_FOUND);
    }

    /**
     * Elimina una aerolínea de la base de datos.
     * @param id Identificador de la aerolínea a eliminar.
     * @throws WebApplicationException Si la aerolínea con el ID especificado no puede ser encontrada o eliminada.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public void eliminarAerolinea(@PathParam("id") Long id) {
        if (!aerolineaRepository.deleteById(id)) {
            throw new WebApplicationException("Aerolínea con id " + id + " no encontrada o no se pudo eliminar", Response.Status.NOT_FOUND);
        }
    }
}



