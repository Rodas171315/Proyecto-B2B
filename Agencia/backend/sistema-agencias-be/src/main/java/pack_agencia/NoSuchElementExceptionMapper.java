package pack_agencia;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import java.util.NoSuchElementException;

/**
 * Clase que proporciona un mapeo de la excepción {@link NoSuchElementException} a una respuesta HTTP.
 * Este manejador captura excepciones de tipo {@link NoSuchElementException} lanzadas por cualquier parte
 * de la aplicación y las convierte en una respuesta HTTP adecuada.
 */
@Provider
public class NoSuchElementExceptionMapper implements ExceptionMapper<NoSuchElementException> {

    /**
     * Clase interna para representar el mensaje de error cuando se produce una {@link NoSuchElementException}.
     */
    public static record NoSuchElementMessage(String message, String detail) {
    
    }
    
    /**
     * Método que procesa la excepción {@link NoSuchElementException} y genera una respuesta HTTP.
     * 
     * @param e La excepción de tipo {@link NoSuchElementException} que fue lanzada.
     * @return Una respuesta HTTP con estado 404 (Not Found) que contiene los detalles de la excepción.
     */
    @Override
    public Response toResponse(NoSuchElementException e) {
        var error = new NoSuchElementMessage(e.getMessage(), null);
        return Response.status(Response.Status.NOT_FOUND).entity(error).build();
    }
    
}

