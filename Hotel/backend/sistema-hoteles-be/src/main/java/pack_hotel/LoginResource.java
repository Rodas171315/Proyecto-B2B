package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Recurso de autenticación que proporciona el endpoint para el proceso de login.
 */
@Path("/login")
public class LoginResource {

    @Inject
    UsuarioRepositorio usuarioRepositorio;

    /**
     * Procesa la solicitud de inicio de sesión y autentica a los usuarios basándose en sus credenciales.
     *
     * @param credentials Objeto UsuarioDTO que contiene email y contraseña del usuario.
     * @return Response que contiene el objeto del usuario autenticado o un mensaje de error si la autenticación falla.
     */
    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(UsuarioDTO credentials) {
        Usuarios usuario = usuarioRepositorio.find("email", credentials.email).firstResult();

        if (usuario != null && usuario.getPassword().equals(credentials.password)) {
            return Response.ok(usuario).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Credenciales inválidas").build();
        }
    }

    /**
     * Clase interna para representar las credenciales de usuario recibidas en las solicitudes de login.
     */
    public static class UsuarioDTO {
        public String email;
        public String password;
        
    }
}
