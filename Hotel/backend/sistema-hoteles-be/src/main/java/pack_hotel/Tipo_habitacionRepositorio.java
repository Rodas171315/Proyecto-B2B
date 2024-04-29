package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

/**
 * Repositorio para manejar las operaciones de la entidad Tipos_habitacion.
 * Proporciona métodos personalizados además de los métodos CRUD básicos heredados de PanacheRepository.
 */
@ApplicationScoped
public class Tipo_habitacionRepositorio implements PanacheRepository<Tipos_habitacion> {
    
    @Inject
    EntityManager em;

        /**
     * Actualiza la URL de la imagen de un tipo de habitación específico.
     * @param idTipoHabitacion El ID del tipo de habitación a actualizar.
     * @param urlImagen La nueva URL de la imagen que se asignará al tipo de habitación.
     */
    public void actualizarImagen(Long idTipoHabitacion, String urlImagen) {
        Tipos_habitacion tipoHabitacion = findById(idTipoHabitacion);
        if (tipoHabitacion != null) {
            tipoHabitacion.setImagenUrl(urlImagen);
            em.merge(tipoHabitacion); // Usando merge para actualizar
        }
    }
}