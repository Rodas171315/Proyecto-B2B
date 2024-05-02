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

/**
 * Recurso REST para la gestión de habitaciones de hoteles.
 * Permite consultar las habitaciones disponibles por hotel.
 */
@Path("/hoteles")
public class HabitacionResource {

    @Inject
    ObjectMapper objectMapper;

    /**
     * Obtiene las habitaciones disponibles de un hotel específico.
     * @param hotelId El identificador del hotel.
     * @return Una lista de habitaciones disponibles en el hotel especificado.
     * @throws IOException Si ocurre un error al leer el archivo de datos.
     */
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

    /**
     * Clase interna que representa una habitación de hotel.
     */
    public static class Habitacion {
        private int id;
        private int hotelId;
        private String tipo;
        private String descripcion;
        private double precio;
        private List<String> imagenes;
        
        /**
         * Constructor por defecto.
         */
        public Habitacion() {}
    
        /**
         * Constructor con todos los campos de la habitación.
         * @param id El identificador de la habitación.
         * @param hotelId El identificador del hotel al que pertenece la habitación.
         * @param tipo El tipo de habitación.
         * @param descripcion La descripción de la habitación.
         * @param precio El precio por noche.
         * @param imagenes Una lista de imágenes de la habitación.
         */
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
