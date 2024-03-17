package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import java.util.List;
import java.util.NoSuchElementException;

@Path("/habitaciones")
@Transactional
public class HabitacionRecurso {
    
    @Inject
    private HabitacionRepositorio habitacionesRepositorio;
    
    @GET
    public List<Habitaciones> index() {
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
    public Habitaciones update(@PathParam("id") Long id, Habitaciones habitacion) {
        var updatedData = habitacionesRepositorio.findById(id);
        if (updatedData != null) {
            updatedData.setId_hotel(habitacion.getId_hotel());
            updatedData.setDisponible(habitacion.isDisponible());
            updatedData.setNumero_habitacion(habitacion.getNumero_habitacion());
            updatedData.setCapacidad_personas(habitacion.getCapacidad_personas());
            updatedData.setTipo_habitacion(habitacion.getTipo_habitacion()); // Now accepts Integer
            updatedData.setPrecioxpersona(habitacion.getPrecioxpersona());
            updatedData.setPrecioxnoche(habitacion.getPrecioxnoche());
            updatedData.setValuacion(habitacion.getValuacion());
            habitacionesRepositorio.persist(updatedData);
            return updatedData;
        }
        throw new NoSuchElementException("No existe una habitacion con el ID: " + id + ".");
    }
}
