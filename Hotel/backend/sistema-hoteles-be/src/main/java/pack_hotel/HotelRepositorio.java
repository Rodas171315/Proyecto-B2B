package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;


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
    
    public List<String> obtenerImagenesAmenidadesPorHotel(Long idHotel) {
        return em.createQuery("SELECT ia.urlImagen FROM ImagenAmenidad ia WHERE ia.hotel.id = :idHotel", String.class)
                .setParameter("idHotel", idHotel)
                .getResultList();

    }
    public void cambiarEstado(Long idHotel, String estado) {
        Hoteles hotel = findById(idHotel);
        if (hotel != null) {
            hotel.setEstado(estado.toLowerCase());
            persist(hotel);
        }
    }

    

}
