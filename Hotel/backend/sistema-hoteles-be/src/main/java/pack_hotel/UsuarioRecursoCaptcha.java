package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;


import jakarta.ws.rs.POST;

import jakarta.ws.rs.Path;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipse.microprofile.rest.client.inject.RestClient;



/**
 *
 * @author root
 */

@RegisterRestClient(configKey="recaptchaService")
@Path("/usuarios")
@Transactional

public class UsuarioRecursoCaptcha {


    @Inject
    private UsuarioRepositorio usuariosRepositorio;

    @Inject
    private RolRepositorio rolRepositorio;

    @Inject
    @RestClient
    RecaptchaService recaptchaService;

    

    
    @POST
    @Path("/captcha") // Asegúrate de que este path sea exactamente el que intentas acceder
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response crearUsuario(UsuarioCreacionDTO dto) {
        System.out.println("DTO recibido: " + dto); // Agrega un log para imprimir el DTO recibido
    
        Usuarios nuevoUsuario = new Usuarios();
        nuevoUsuario.setRol(dto.getRol());
        nuevoUsuario.setEmail(dto.getEmail());
        nuevoUsuario.setPassword(dto.getPassword()); // Considera manejar las contraseñas de manera segura
        nuevoUsuario.setPrimer_nombre(dto.getPrimerNombre());
        nuevoUsuario.setSegundo_nombre(dto.getSegundoNombre());
        nuevoUsuario.setPrimer_apellido(dto.getPrimerApellido());
        nuevoUsuario.setSegundo_apellido(dto.getSegundoApellido());
        nuevoUsuario.setFecha_nacimiento(dto.getFechaNacimiento());
        nuevoUsuario.setNacionalidad(dto.getNacionalidad());
        nuevoUsuario.setPasaporte(dto.getPasaporte());
        
        usuariosRepositorio.persist(nuevoUsuario);
        
        // Asegurándose de que el ID se haya asignado automáticamente
        if (nuevoUsuario.getId() == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("No se pudo crear el usuario.").build();
        }
        
        // Obtener el nombre del rol para incluirlo en el DTO
        String nombreRol = rolRepositorio.obtenerNombreRolPorId(Long.valueOf(nuevoUsuario.getRol()));
        nombreRol = nombreRol != null ? nombreRol : "Rol no encontrado";
        
        UsuarioDetalleDTO usuarioCreadoDTO = new UsuarioDetalleDTO(
            nuevoUsuario.getId(),
            nombreRol,
            nuevoUsuario.getEmail(),
            nuevoUsuario.getPrimer_nombre(),
            nuevoUsuario.getSegundo_nombre(),
            nuevoUsuario.getPrimer_apellido(),
            nuevoUsuario.getSegundo_apellido(),
            nuevoUsuario.getFecha_nacimiento(),
            nuevoUsuario.getNacionalidad(),
            nuevoUsuario.getPasaporte()
        );
    
        return Response.status(Response.Status.CREATED).entity(usuarioCreadoDTO).build();
    }
}