package pack_hotel;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

/**
 * Servicio cliente REST para interactuar con el API de verificación de Google reCAPTCHA.
 * Utiliza MicroProfile Rest Client para definir la interfaz de servicio.
 */
@Path("/siteverify") // Esto es el path para el servicio de Google, no tu aplicación
@RegisterRestClient(configKey = "recaptchaService")
public interface RecaptchaService {

    /**
     * Método para verificar la respuesta de reCAPTCHA enviada desde el cliente.
     * Este método llama al API de Google reCAPTCHA para validar que la respuesta proporcionada por el usuario es válida.
     *
     * @param secret El secreto del sitio utilizado para la autenticación con el servicio de Google reCAPTCHA.
     * @param response La respuesta generada por el widget de reCAPTCHA en el lado del cliente.
     * @return Un objeto RecaptchaResponse que contiene el resultado de la verificación.
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    RecaptchaResponse verify(@FormParam("secret") String secret, @FormParam("response") String response);
}
