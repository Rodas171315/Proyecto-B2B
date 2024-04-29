package pack_agencia;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.io.InputStream;
import java.util.List;

/**
 * Servicio REST para obtener contenido estático relacionado con viajes.
 * Proporciona acceso a destinos populares, promociones, ofertas especiales y hospedajes favoritos.
 */
@Path("/contenido-estatico")
public class StaticContentService {

    @Inject
    ObjectMapper objectMapper;

    /**
     * Obtiene una lista de destinos populares a partir de un archivo JSON.
     * @return Una lista de destinos populares.
     * @throws Exception Si hay un error al leer o procesar el archivo JSON.
     */
    @GET
    @Path("/destinos-populares")
    @Produces(MediaType.APPLICATION_JSON)
    public List<DestinoPopular> obtenerDestinosPopulares() throws Exception {
        InputStream is = getClass().getResourceAsStream("/destinosPopulares.json");
        return objectMapper.readValue(is, new TypeReference<List<DestinoPopular>>() {});
    }

    /**
     * Obtiene un destino popular por su identificador.
     * @param id El identificador del destino popular.
     * @return El destino popular correspondiente al identificador proporcionado.
     * @throws Exception Si el destino popular no se encuentra o hay un error al leer el archivo JSON.
     */
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

    /**
     * Obtiene una lista de promociones y ofertas especiales desde un archivo JSON.
     * @return Una lista de promociones y ofertas especiales disponibles.
     * @throws Exception Si hay un error al leer o procesar el archivo JSON.
     */
    @GET
    @Path("/promociones-ofertas-especiales")
    @Produces(MediaType.APPLICATION_JSON)
    public List<PromocionOfertaEspecial> obtenerPromocionesOfertasEspeciales() throws Exception {
        InputStream is = getClass().getResourceAsStream("/promocionesOfertasEspeciales.json");
        return objectMapper.readValue(is, new TypeReference<List<PromocionOfertaEspecial>>() {});
    }

    /**
     * Obtiene una promoción u oferta especial por su identificador.
     * @param id El identificador de la promoción u oferta especial.
     * @return La promoción u oferta especial correspondiente al identificador.
     * @throws Exception Si la promoción u oferta no se encuentra o hay un error al leer el archivo JSON.
     */
    @GET
    @Path("/promociones-ofertas-especiales/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public PromocionOfertaEspecial obtenerPromocionOfertaEspecialPorId(@PathParam("id") int id) throws Exception {
        InputStream is = getClass().getResourceAsStream("/promocionesOfertasEspeciales.json");
        List<PromocionOfertaEspecial> ofertas = objectMapper.readValue(is, new TypeReference<List<PromocionOfertaEspecial>>() {});

        return ofertas.stream()
                    .filter(oferta -> oferta.getId() == id)
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException("Oferta no encontrada"));
    }

    /**
     * Obtiene una lista de hospedajes favoritos desde un archivo JSON.
     * @return Una lista de hospedajes favoritos.
     * @throws Exception Si hay un error al leer o procesar el archivo JSON.
     */
    @GET
    @Path("/descubre-hospedaje")
    @Produces(MediaType.APPLICATION_JSON)
    public List<HospedajeFavorito> obtenerHospedajesFavoritos() throws Exception {
        InputStream is = getClass().getResourceAsStream("/descubreHospedaje.json");
        return objectMapper.readValue(is, new TypeReference<List<HospedajeFavorito>>() {});
    }
}

