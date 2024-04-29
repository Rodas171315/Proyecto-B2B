package pack_agencia;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.inject.Inject;
import java.util.List;
import jakarta.ws.rs.core.Response;


@Path("/hotelesA")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class HotelesService {

    @Inject
    HotelRepository hotelRepository; 

    @GET
    public List<Hoteles> listarHoteles() {
        return hotelRepository.listAll();
    }

    @POST
    @Transactional
    public Hoteles crearHotel(Hoteles hotel) {
        hotelRepository.persist(hotel);
        return hotel;
    }

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

    @DELETE
    @Path("/{id}")
    @Transactional
    public void eliminarHotel(@PathParam("id") Long id) {
        if (!hotelRepository.deleteById(id)) {
            throw new WebApplicationException("Hotel con id " + id + " no encontrado o no se pudo eliminar", Response.Status.NOT_FOUND);
        }
    }
}
