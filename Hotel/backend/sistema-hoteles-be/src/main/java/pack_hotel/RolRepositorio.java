package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * A repository for managing {@link Rol} entities.
 */
@ApplicationScoped
public class RolRepositorio implements PanacheRepository<Rol> {

    /**
     * Finds the name of the role by its ID.
     *
     * @param id The ID of the role.
     * @return The name of the role, or "Rol no encontrado" if not found.
     */
    public String obtenerNombreRolPorId(Long id) {
        Rol rol = find("id", id).firstResult(); // Assure that "id" is the correct name of the field in the Rol entity
        return rol != null ? rol.getTipo() : "Rol no encontrado";
    }
}
