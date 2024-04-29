package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * Repositorio para operaciones CRUD en entidades Faqs.
 * Extiende PanacheRepository, lo cual provee métodos estándar como persist, delete, etc.
 */
@ApplicationScoped
public class FaqsRepositorio implements PanacheRepository<Faqs> {
    
}

