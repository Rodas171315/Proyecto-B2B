package pack_agencia;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * Repositorio para la entidad Hoteles, proporcionando una capa de abstracción
 * para interactuar con la base de datos. Utiliza PanacheRepository para ofrecer
 * operaciones de base de datos simplificadas.
 */
@ApplicationScoped
public class HotelRepository implements PanacheRepository<Hoteles> {
    
}

