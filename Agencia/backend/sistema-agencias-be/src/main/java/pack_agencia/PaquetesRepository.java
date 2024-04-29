package pack_agencia;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * Repositorio para gestionar las operaciones de la entidad {@link Paquetes}.
 * Utiliza Panache para simplificar las operaciones de persistencia.
 * 
 * Está marcado como {@link ApplicationScoped} para que una instancia del repositorio
 * sea compartida durante la vida útil de la aplicación JAX-RS.
 */
@ApplicationScoped
public class PaquetesRepository implements PanacheRepository<Paquetes> {
    
}


