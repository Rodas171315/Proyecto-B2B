package pack_agencia;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio REST para buscar contenido estático como hospedajes y vuelos.
 * Permite filtrar hospedajes y vuelos basados en diferentes criterios de búsqueda.
 */
@Path("/static")
public class StaticContentResource {

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Busca hospedajes basados en los criterios proporcionados.
     * @param criterios CriteriosBusqueda con los filtros aplicables a los hospedajes.
     * @return Una lista de hospedajes que coinciden con los criterios de búsqueda.
     * @throws IOException Si hay un error en la lectura del archivo JSON.
     */
    @POST
    @Path("/hospedajes")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Hospedaje> buscarHospedajes(CriteriosBusqueda criterios) throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("/hospedajes.json");
        List<Hospedaje> hospedajes = objectMapper.readValue(inputStream, new TypeReference<List<Hospedaje>>() {});
        return hospedajes.stream().filter(h -> 
            h.getCiudad().equalsIgnoreCase(criterios.getCiudad()) &&
            h.getCapacidadMax() >= criterios.getAdultos() + criterios.getNiños() &&
            true
        ).collect(Collectors.toList());
    }

    /**
     * Busca vuelos basados en los criterios proporcionados.
     * @param criterios CriteriosBusqueda con los filtros aplicables a los vuelos.
     * @return Una lista de vuelos que coinciden con los criterios de búsqueda.
     * @throws IOException Si hay un error en la lectura del archivo JSON.
     */
    @POST
    @Path("/vuelos")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Vuelo> buscarVuelos(CriteriosBusqueda criterios) throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("/vuelos.json");
        List<Vuelo> vuelos = objectMapper.readValue(inputStream, new TypeReference<List<Vuelo>>() {});
        return vuelos.stream().filter(v ->
            v.getOrigen().equalsIgnoreCase(criterios.getOrigen()) &&
            v.getDestino().equalsIgnoreCase(criterios.getDestino()) &&
            (criterios.getClaseVuelo().isEmpty() || v.getClasesDisponibles().contains(criterios.getClaseVuelo())) &&
            v.getFecha().compareTo(criterios.getFechaIda()) >= 0 &&
            (criterios.getFechaVuelta().isEmpty() || v.getFecha().compareTo(criterios.getFechaVuelta()) <= 0)
        ).collect(Collectors.toList());
    }

    /**
     * Clase que encapsula los criterios de búsqueda para hospedajes y vuelos.
     */
    public static class CriteriosBusqueda {
        private String ciudad;
        private int adultos;
        private int niños;
        private String origen;
        private String destino;
        private String fechaIda;
        private String fechaVuelta;
        private String tipoViaje;
        private String claseVuelo;
    
        // Getters y Setters
    
        public String getCiudad() {
            return ciudad;
        }
    
        public void setCiudad(String ciudad) {
            this.ciudad = ciudad;
        }
    
        public int getAdultos() {
            return adultos;
        }
    
        public void setAdultos(int adultos) {
            this.adultos = adultos;
        }
    
        public int getNiños() {
            return niños;
        }
    
        public void setNiños(int niños) {
            this.niños = niños;
        }
    
        public String getOrigen() {
            return origen;
        }
    
        public void setOrigen(String origen) {
            this.origen = origen;
        }
    
        public String getDestino() {
            return destino;
        }
    
        public void setDestino(String destino) {
            this.destino = destino;
        }
    
        public String getFechaIda() {
            return fechaIda;
        }
    
        public void setFechaIda(String fechaIda) {
            this.fechaIda = fechaIda;
        }
    
        public String getFechaVuelta() {
            return fechaVuelta;
        }
    
        public void setFechaVuelta(String fechaVuelta) {
            this.fechaVuelta = fechaVuelta;
        }
    
        public String getTipoViaje() {
            return tipoViaje;
        }
    
        public void setTipoViaje(String tipoViaje) {
            this.tipoViaje = tipoViaje;
        }
    
        public String getClaseVuelo() {
            return claseVuelo;
        }
    
        public void setClaseVuelo(String claseVuelo) {
            this.claseVuelo = claseVuelo;
        }
    }
    
}
