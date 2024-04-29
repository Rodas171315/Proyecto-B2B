package pack_hotel;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Path("/siteverify") // Esto es el path para el servicio de Google, no tu aplicación
@RegisterRestClient(configKey = "recaptchaService")
public interface RecaptchaService {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    RecaptchaResponse verify(@FormParam("secret") String secret, @FormParam("response") String response);
}
