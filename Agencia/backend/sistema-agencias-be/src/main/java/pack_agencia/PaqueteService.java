package pack_agencia;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.io.InputStream;
import java.util.List;

@Path("/paquetes")
@ApplicationScoped
public class PaqueteService {

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Paquete> obtenerPaquetes() {
        try (InputStream inputStream = getClass().getResourceAsStream("/paquetes.json")) {
            return objectMapper.readValue(inputStream, new TypeReference<List<Paquete>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Error al cargar paquetes", e);
        }
    }
}



