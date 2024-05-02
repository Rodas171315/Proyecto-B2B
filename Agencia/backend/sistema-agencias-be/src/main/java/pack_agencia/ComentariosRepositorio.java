package pack_agencia;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * Repositorio Panache para la entidad Comentarios.
 * Panache proporciona operaciones CRUD simplificadas y consultas personalizadas para la entidad Comentarios.
 * Esta clase está marcada como {@link ApplicationScoped} lo que significa que una instancia de esta clase es creada
 * y gestionada por el contexto de aplicación de Jakarta EE y es compartida entre todos los usuarios.
 */
@ApplicationScoped
public class ComentariosRepositorio implements PanacheRepository<Comentarios> {
    
}


