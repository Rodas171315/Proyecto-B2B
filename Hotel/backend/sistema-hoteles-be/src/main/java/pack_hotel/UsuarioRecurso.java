package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.ProcessingException;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.logging.Logger;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

/**
 *
 * @author root
 */

@RegisterRestClient(configKey="recaptchaService")
@Path("/usuarios")
@Transactional

public class UsuarioRecurso {

    private static final Logger log = Logger.getLogger(UsuarioRecurso.class);

    @Inject
    private UsuarioRepositorio usuariosRepositorio;

    @Inject
    private RolRepositorio rolRepositorio;

    @Inject
    @RestClient
    RecaptchaService recaptchaService;

    


    @GET
    public List<Usuarios> index() {
        return usuariosRepositorio.listAll();
    }
    
        


    
    @GET
    @Path("{id}")
    public Usuarios retrieve(@PathParam("id") Long id) {
        var user = usuariosRepositorio.findById(id);
        if (user != null) {
            return user;
        }
        throw new NoSuchElementException("No hay usuario con el ID " + id + ".");
    }
    
    @DELETE
    @Path("/{id}")
    public Response eliminarUsuario(@PathParam("id") Long id) {
        Usuarios usuario = usuariosRepositorio.findById(id);
        if (usuario != null) {
            usuariosRepositorio.delete(usuario);
            return Response.ok().build(); // Respuesta exitosa sin contenido
        } else {
            return Response.status(Response.Status.NOT_FOUND).build(); // Usuario no encontrado
        }
    }

    
    @PUT
    @Path("{id}")
    public Usuarios update(@PathParam("id") Long id, Usuarios user) {
        var updatedUser = usuariosRepositorio.findById(id);
        if (updatedUser != null) {
            updatedUser.setRol(user.getRol());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setPrimer_nombre(user.getPrimer_nombre());
            updatedUser.setSegundo_nombre(user.getSegundo_nombre());
            updatedUser.setPrimer_apellido(user.getPrimer_apellido());
            updatedUser.setSegundo_apellido(user.getSegundo_apellido());
            updatedUser.setFecha_nacimiento(user.getFecha_nacimiento());
            updatedUser.setNacionalidad(user.getNacionalidad());
            updatedUser.setPasaporte(user.getPasaporte());
            usuariosRepositorio.persist(updatedUser);
            return updatedUser;
        }
        throw new NoSuchElementException("No existe un usuario con el ID: " + id + ".");
    }
    

    @PUT
    @Path("{id}/rol")
    public Response actualizarRolUsuario(@PathParam("id") Long id, @QueryParam("nuevoRol") int nuevoRol) {
        Usuarios usuario = usuariosRepositorio.findByIdOptional(id).orElseThrow(() ->
            new NoSuchElementException("Usuario no encontrado con ID: " + id + "."));
        
        usuario.setRol(nuevoRol);
        usuariosRepositorio.persist(usuario);
        return Response.ok(usuario).build();
    }

    @GET
    @Path("/detalles")
    public Response obtenerDetallesUsuarios() {
        List<UsuarioDetalleDTO> detallesUsuarios = usuariosRepositorio.listAll().stream().map(usuario -> {
            // Convierte el int a Long
            Long rolId = Long.valueOf(usuario.getRol());
            String nombreRol = rolRepositorio.obtenerNombreRolPorId(rolId);
            nombreRol = nombreRol != null ? nombreRol : "Rol no encontrado";
            return new UsuarioDetalleDTO(usuario.getId(), nombreRol, usuario.getEmail(), usuario.getPrimer_nombre(), usuario.getSegundo_nombre(),
                    usuario.getPrimer_apellido(), usuario.getSegundo_apellido(), usuario.getFecha_nacimiento(),
                    usuario.getNacionalidad(), usuario.getPasaporte());
        }).collect(Collectors.toList());
        return Response.ok(detallesUsuarios).build();
    }
    
    @POST
    @Path("/crear")
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

    
    @PUT
@Path("/{id}")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public Response actualizarUsuario(@PathParam("id") Long id, UsuarioEdicionDTO dto) {
    System.out.println("Recibida solicitud de actualización para usuario con ID: " + id + " y datos: " + dto);

    if (dto.getRol() == null) {
        // Puedes retornar un código de error específico o un mensaje que indique que el rol es requerido.
        return Response.status(Response.Status.BAD_REQUEST).entity("El rol es requerido").build();
    }

    Usuarios usuarioExistente = usuariosRepositorio.findById(id);
    if (usuarioExistente == null) {
        System.out.println("Usuario no encontrado con ID: " + id);

        return Response.status(Response.Status.NOT_FOUND).build();
    }
    System.out.println("Usuario actual antes de la actualización: " + usuarioExistente);


    // Actualiza solo los campos que necesitas cambiar. En este caso, el rol.
    usuarioExistente.setRol(dto.getRol());
    
    usuariosRepositorio.persist(usuarioExistente);

    UsuarioDetalleDTO usuarioActualizadoDTO = new UsuarioDetalleDTO(
        usuarioExistente.getId(),
        rolRepositorio.obtenerNombreRolPorId(Long.valueOf(usuarioExistente.getRol())),
        usuarioExistente.getEmail(),
        usuarioExistente.getPrimer_nombre(),
        usuarioExistente.getSegundo_nombre(),
        usuarioExistente.getPrimer_apellido(),
        usuarioExistente.getSegundo_apellido(),
        usuarioExistente.getFecha_nacimiento(),
        usuarioExistente.getNacionalidad(),
        usuarioExistente.getPasaporte()
    );

    System.out.println("Usuario actualizado: " + usuarioActualizadoDTO);

    return Response.ok(usuarioActualizadoDTO).build();
}


}
