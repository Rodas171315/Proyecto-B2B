package pack_agencia;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Clase que representa un recurso REST para la gestión de usuarios.
 * Proporciona operaciones CRUD para interactuar con la base de datos de usuarios.
 */
@Path("/usuarios")
@Transactional
public class UsuarioRecurso {
    
    @Inject
    private UsuarioRepositorio usuariosRepositorio;
    
    /**
     * Obtiene una lista de todos los usuarios registrados.
     * @return Lista de usuarios.
     */
    @GET
    public List<Usuarios> index() {
        return usuariosRepositorio.listAll();
    }
    
    /**
     * Crea y persiste un nuevo usuario en la base de datos.
     * @param insertedUser Usuario a insertar.
     * @return El usuario insertado con su ID asignado.
     */
    @POST
    public Usuarios insert(Usuarios insertedUser) {
        assert insertedUser.getId() == null;
        usuariosRepositorio.persist(insertedUser);
        assert insertedUser.getId() != null;
        return insertedUser;
    }
    
    /**
     * Obtiene un usuario específico por su ID.
     * @param id Identificador del usuario.
     * @return Usuario correspondiente al ID.
     * @throws NoSuchElementException Si no se encuentra el usuario.
     */
    @GET
    @Path("{id}")
    public Usuarios retrieve(@PathParam("id") Long id) {
        var user = usuariosRepositorio.findById(id);
        if (user != null) {
            return user;
        }
        throw new NoSuchElementException("No hay usuario con el ID " + id + ".");
    }
    
    /**
     * Elimina un usuario específico por su ID.
     * @param id Identificador del usuario a eliminar.
     * @return Mensaje indicando si el usuario fue borrado o no existía.
     */
    @DELETE
    @Path("{id}")
    public String delete(@PathParam("id") Long id) {
        if (usuariosRepositorio.deleteById(id)) {
            return "El usuario se ha borrado";
        } else {
            return "No se ha borrado (no existe)";
        }
    }
    
    /**
     * Actualiza la información de un usuario existente.
     * @param id ID del usuario a actualizar.
     * @param user Datos del usuario con las actualizaciones aplicadas.
     * @return Usuario actualizado.
     * @throws NoSuchElementException Si no existe un usuario con el ID proporcionado.
     */
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
    
}

