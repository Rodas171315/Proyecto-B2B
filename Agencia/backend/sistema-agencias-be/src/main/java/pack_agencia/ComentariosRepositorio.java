package pack_agencia;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ComentariosRepositorio implements PanacheRepository<Comentarios> {
    
}

