package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

/**
 *
 * @author root
 */
@Path("/usuarios")
@Transactional
public class UsuarioRecurso {

    private static final Logger log = Logger.getLogger(UsuarioRecurso.class);

    @Inject
    private UsuarioRepositorio usuariosRepositorio;

    @Inject
    private RolRepositorio rolRepositorio;

    @GET
    public List<Usuarios> index() {
        return usuariosRepositorio.listAll();
    }
    
    @POST
    public Usuarios insert(Usuarios insertedUser) {
        assert insertedUser.getId() == null;
        usuariosRepositorio.persist(insertedUser);
        assert insertedUser.getId() != null;
        return insertedUser;
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
    @Path("{id}")
    public String delete(@PathParam("id") Long id) {
        if (usuariosRepositorio.deleteById(id)) {
            return "El usuario se ha borrado";
        } else {
            return "No se ha borrado (no existe)";
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
    
    
    
}
