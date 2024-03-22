package pack_agencia;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.io.InputStream;
import java.util.List;

@Path("/contenido-estatico")
public class StaticContentService {
    
    @Inject
    ObjectMapper objectMapper;

    @GET
    @Path("/destinos-populares")
    @Produces(MediaType.APPLICATION_JSON)
    public List<DestinoPopular> obtenerDestinosPopulares() throws Exception {
        InputStream is = getClass().getResourceAsStream("/destinosPopulares.json");
        return objectMapper.readValue(is, new TypeReference<List<DestinoPopular>>() {});
    }

    @GET
    @Path("/destinos-populares/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public DestinoPopular obtenerDestinoPopularPorId(@PathParam("id") int id) throws Exception {
        InputStream is = getClass().getResourceAsStream("/destinosPopulares.json");
        List<DestinoPopular> destinos = objectMapper.readValue(is, new TypeReference<List<DestinoPopular>>() {});
        
        for (DestinoPopular destino : destinos) {
            if (destino.getId() == id) {
                return destino;
            }
        }
        throw new NotFoundException("Destino no encontrado");
    }



    @GET
    @Path("/promociones-ofertas-especiales")
    @Produces(MediaType.APPLICATION_JSON)
    public List<PromocionOfertaEspecial> obtenerPromocionesOfertasEspeciales() throws Exception {
        InputStream is = getClass().getResourceAsStream("/promocionesOfertasEspeciales.json");
        return objectMapper.readValue(is, new TypeReference<List<PromocionOfertaEspecial>>() {});
    }

    @GET
    @Path("/descubre-hospedaje")
    @Produces(MediaType.APPLICATION_JSON)
    public List<HospedajeFavorito> obtenerHospedajesFavoritos() throws Exception {
        InputStream is = getClass().getResourceAsStream("/descubreHospedaje.json");
        return objectMapper.readValue(is, new TypeReference<List<HospedajeFavorito>>() {});
    }
}
