package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * Clase repositorio que proporciona operaciones de persistencia para la entidad Secciones_Generales.
 * Extiende de PanacheRepository, que incluye métodos CRUD por defecto y soporte para consultas personalizadas.
 */
@ApplicationScoped
public class Secciones_GeneralesRepositorio implements PanacheRepository<Secciones_Generales> {
}
