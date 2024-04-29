package pack_agencia;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * Clase Repositorio que permite la gestión de datos de las entidades de tipo {@link Aerolineas}.
 * Utiliza Panache para simplificar las operaciones CRUD y la interacción con la base de datos.
 *
 * Esta clase es parte del patrón de diseño Repository, proporcionando una abstracción
 * de la capa de acceso a datos. Está marcada como {@link ApplicationScoped} lo que implica
 * que la instancia del repositorio es única y compartida en la aplicación.
 */
@ApplicationScoped
public class AerolineaRepository implements PanacheRepository<Aerolineas> {
    
   
}

