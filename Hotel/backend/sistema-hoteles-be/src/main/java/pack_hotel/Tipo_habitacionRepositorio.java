package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import java.util.List;

@ApplicationScoped
public class Tipo_habitacionRepositorio implements PanacheRepository<Tipos_habitacion> {
    
    @Inject
    EntityManager em;

    public void actualizarImagen(Long idTipoHabitacion, String urlImagen) {
        Tipos_habitacion tipoHabitacion = findById(idTipoHabitacion);
        if (tipoHabitacion != null) {
            tipoHabitacion.setImagenUrl(urlImagen);
            em.merge(tipoHabitacion); // Usando merge para actualizar
        }
    }
}