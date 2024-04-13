package pack_agencia;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Path("/hoteles")
public class HabitacionResource {

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Path("/{hotelId}/habitaciones")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Habitacion> obtenerHabitacionesPorHotel(@PathParam("hotelId") int hotelId) throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("/habitaciones.json");
        List<Habitacion> todasLasHabitaciones = objectMapper.readValue(inputStream, new TypeReference<List<Habitacion>>() {});
        return todasLasHabitaciones.stream()
                .filter(habitacion -> habitacion.getHotelId() == hotelId)
                .collect(Collectors.toList());
    }

    
    public static class Habitacion {
        private int id;
        private int hotelId;
        private String tipo;
        private String descripcion;
        private double precio;
        private List<String> imagenes;
    
        
        public Habitacion() {}
    
       
        public Habitacion(int id, int hotelId, String tipo, String descripcion, double precio, List<String> imagenes) {
            this.id = id;
            this.hotelId = hotelId;
            this.tipo = tipo;
            this.descripcion = descripcion;
            this.precio = precio;
            this.imagenes = imagenes;
        }
    
        
        public int getId() {
            return id;
        }
    
        public int getHotelId() {
            return hotelId;
        }
    
        public String getTipo() {
            return tipo;
        }
    
        public String getDescripcion() {
            return descripcion;
        }
    
        public double getPrecio() {
            return precio;
        }
    
        public List<String> getImagenes() {
            return imagenes;
        }
    
       
        public void setId(int id) {
            this.id = id;
        }
    
        public void setHotelId(int hotelId) {
            this.hotelId = hotelId;
        }
    
        public void setTipo(String tipo) {
            this.tipo = tipo;
        }
    
        public void setDescripcion(String descripcion) {
            this.descripcion = descripcion;
        }
    
        public void setPrecio(double precio) {
            this.precio = precio;
        }
    
        public void setImagenes(List<String> imagenes) {
            this.imagenes = imagenes;
        }
    }
}
