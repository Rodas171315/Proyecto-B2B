package pack_hotel;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;

@Path("/siteverify")
@RegisterRestClient(configKey="recaptcha-api")
public interface RecaptchaService {
    @POST
    RecaptchaResponse verify(@QueryParam("secret") String secret, @QueryParam("response") String response);
}