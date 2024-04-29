package pack_agencia;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.inject.Inject;
import java.util.List;
import jakarta.ws.rs.core.Response;

/**
 * Servicio REST para la gestión de hoteles. Provee operaciones CRUD para manipular y consultar hoteles.
 */
@Path("/hotelesA")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class HotelesService {

    @Inject
    HotelRepository hotelRepository; 

    /**
     * Lista todos los hoteles disponibles.
     * @return una lista de todos los hoteles.
     */
    @GET
    public List<Hoteles> listarHoteles() {
        return hotelRepository.listAll();
    }

    /**
     * Crea un nuevo hotel y lo persiste en la base de datos.
     * @param hotel Objeto de tipo Hoteles que contiene la información del nuevo hotel.
     * @return el hotel recién creado.
     */
    @POST
    @Transactional
    public Hoteles crearHotel(Hoteles hotel) {
        hotelRepository.persist(hotel);
        return hotel;
    }

    /**
     * Actualiza los detalles de un hotel existente.
     * @param id El identificador único del hotel a actualizar.
     * @param detallesHotel Objeto de tipo Hoteles que contiene los nuevos datos del hotel.
     * @return el hotel actualizado.
     * @throws WebApplicationException si el hotel con el ID especificado no se encuentra.
     */
    @PUT
    @Path("/{id}")
    @Transactional
    public Hoteles actualizarHotel(@PathParam("id") Long id, Hoteles detallesHotel) {
        Hoteles hotelExistente = hotelRepository.findById(id);
        if (hotelExistente != null) {
            hotelExistente.setNombre(detallesHotel.getNombre());
            hotelExistente.setDescripcion(detallesHotel.getDescripcion());
            hotelExistente.setUbicacion(detallesHotel.getUbicacion());
            return hotelExistente;
        }
        throw new WebApplicationException("Hotel con id " + id + " no encontrado", Response.Status.NOT_FOUND);
    }

    /**
     * Elimina un hotel de la base de datos.
     * @param id El identificador único del hotel a eliminar.
     * @throws WebApplicationException si el hotel con el ID especificado no se encuentra o no se pudo eliminar.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public void eliminarHotel(@PathParam("id") Long id) {
        if (!hotelRepository.deleteById(id)) {
            throw new WebApplicationException("Hotel con id " + id + " no encontrado o no se pudo eliminar", Response.Status.NOT_FOUND);
        }
    }
}
