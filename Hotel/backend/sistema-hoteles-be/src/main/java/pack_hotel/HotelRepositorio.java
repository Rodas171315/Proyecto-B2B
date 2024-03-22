package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class HotelRepositorio implements PanacheRepository<Hoteles> {

    @Inject
    EntityManager em;

    public List<String> listarPaisesUnicos() {
        return em.createQuery("SELECT DISTINCT h.pais FROM Hoteles h", String.class).getResultList();
    }

    public List<Hoteles> findByPais(String pais) {
        return em.createQuery("SELECT h FROM Hoteles h WHERE h.pais = :pais", Hoteles.class)
                            .setParameter("pais", pais)
                            .getResultList();
    }
    
}
