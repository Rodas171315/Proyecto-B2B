package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import java.util.List;
import java.util.NoSuchElementException;

@Path("/habitaciones")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class HabitacionRecurso {
    
    @Inject
    private HabitacionRepositorio habitacionesRepositorio;
    
    @GET
    public List<Habitaciones> index(@QueryParam("hotelId") Long hotelId) {
        if (hotelId != null) {
            // Filtra las habitaciones por el ID del hotel si se proporciona un hotelId
            return habitacionesRepositorio.list("id_hotel", hotelId);
        }
        // Si no se proporciona hotelId, devuelve todas las habitaciones
        return habitacionesRepositorio.listAll();
    }
    
    @POST
    public Habitaciones insert(Habitaciones insertedData) {
        // Ensure the ID is null to create a new entity
        assert insertedData.getId_habitacion() == null;
        habitacionesRepositorio.persist(insertedData);
        // After persist, ID should be generated and non-null
        assert insertedData.getId_habitacion() != null;
        return insertedData;
    }
    
    @GET
    @Path("{id}")
    public Habitaciones retrieve(@PathParam("id") Long id) {
        var habitacion = habitacionesRepositorio.findById(id);
        if (habitacion != null) {
            return habitacion;
        }
        throw new NoSuchElementException("No hay habitacion con el ID " + id + ".");
    }
    
    @DELETE
    @Path("{id}")
    public String delete(@PathParam("id") Long id) {
        if (habitacionesRepositorio.deleteById(id)) {
            return "La habitacion se ha borrado";
        } else {
            return "No se ha borrado (no existe)";
        }
    }
    
    @PUT
    @Path("{id}")
    public Habitaciones update(@PathParam("id") Long id, Habitaciones datosActualizados) {
        Habitaciones habitacionExistente = habitacionesRepositorio.findById(id);
        if (habitacionExistente != null) {
            // No necesitas verificar si precioxpersona o precioxnoche son null porque son primitivos
            habitacionExistente.setPrecioxpersona(datosActualizados.getPrecioxpersona());
            habitacionExistente.setPrecioxnoche(datosActualizados.getPrecioxnoche());
    
            // Solo actualiza tipo_habitacion si no es null
            if (datosActualizados.getTipo_habitacion() != null) {
                habitacionExistente.setTipo_habitacion(datosActualizados.getTipo_habitacion());
            }
    
            // Actualizar los demás campos como disponible, numero_habitacion, etc., si es necesario
            
            habitacionesRepositorio.persist(habitacionExistente);
            return habitacionExistente;
        } else {
            throw new NoSuchElementException("No se encontró la habitación con el ID proporcionado.");
        }
    }
    
    
    
    
}
