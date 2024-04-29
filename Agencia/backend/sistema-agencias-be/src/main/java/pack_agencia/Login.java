package pack_agencia;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Clase que gestiona las solicitudes de inicio de sesión para los usuarios.
 * Proporciona endpoints para la autenticación de usuarios.
 */
@Path("/login")
public class Login {
    @Inject
    UsuarioRepositorio usuarioRepositorio;

    /**
     * Autentica a un usuario basándose en las credenciales proporcionadas.
     * 
     * @param credentials Un objeto UsuarioDTO que contiene el email y la contraseña del usuario.
     * @return Una respuesta con el usuario autenticado o un mensaje de error si las credenciales son inválidas.
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
     * Clase interna para representar las credenciales de un usuario.
     */
    public static class UsuarioDTO {
        public String email;
        public String password;
    }
}
