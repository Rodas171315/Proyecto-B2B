package pack_agencia;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

@Path("/compras")
public class CompraVueloService {

    @Inject
    ObjectMapper objectMapper;

    private final java.nio.file.Path comprasPath = Paths.get(System.getProperty("user.dir"), "compras.json");

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response realizarCompra(DatosCompra datosCompra) {
        try {
            List<DatosCompra> compras;
            if (Files.exists(comprasPath)) {
                compras = objectMapper.readValue(comprasPath.toFile(), new TypeReference<List<DatosCompra>>() {});
            } else {
                compras = new ArrayList<>();
            }

            compras.add(datosCompra);
            System.out.println("Escribiendo en el archivo: " + comprasPath.toAbsolutePath());

            objectMapper.writeValue(Files.newOutputStream(comprasPath, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING), compras);

            return Response.ok(datosCompra).build();
        } catch (IOException e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al procesar la compra").build();
        }
    }

    public static class DatosCompra {
        private int vueloId;
        private String nombre;
        private String email;
        private String telefono;
        private String numeroTarjeta;
        
        
        
        public DatosCompra() {}
    
        
        public int getVueloId() {
            return vueloId;
        }
    
        public String getNombre() {
            return nombre;
        }
    
        public String getEmail() {
            return email;
        }
    
        public String getTelefono() {
            return telefono;
        }
    
        public String getNumeroTarjeta() {
            return numeroTarjeta;
        }
    
        
        public void setVueloId(int vueloId) {
            this.vueloId = vueloId;
        }
    
        public void setNombre(String nombre) {
            this.nombre = nombre;
        }
    
        public void setEmail(String email) {
            this.email = email;
        }
    
        public void setTelefono(String telefono) {
            this.telefono = telefono;
        }
    
        public void setNumeroTarjeta(String numeroTarjeta) {
            this.numeroTarjeta = numeroTarjeta;
        }
    
        
    
        
    }
    
}
