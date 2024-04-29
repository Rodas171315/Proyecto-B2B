package pack_agencia;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * Repositorio para la entidad Usuarios. Utiliza Panache para simplificar las operaciones de persistencia.
 * Este repositorio está diseñado para acceder y manipular los datos de los usuarios en la base de datos.
 */
@ApplicationScoped
public class UsuarioRepositorio implements PanacheRepository<Usuarios> {
    
}

