package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.inject.Inject;
import java.util.List;


/**
 * Repositorio para realizar operaciones de base de datos en entidades Hoteles.
 */
@ApplicationScoped
public class HotelRepositorio implements PanacheRepository<Hoteles> {

    @Inject
    EntityManager em;

    /**
     * Lista todos los países únicos donde hay hoteles.
     *
     * @return Lista de nombres de países.
     */
    public List<String> listarPaisesUnicos() {
        return em.createQuery("SELECT DISTINCT h.pais FROM Hoteles h", String.class).getResultList();
    }

    /**
     * Encuentra hoteles por país.
     *
     * @param pais El país para filtrar hoteles.
     * @return Una lista de hoteles ubicados en el país especificado.
     */
    public List<Hoteles> findByPais(String pais) {
        return em.createQuery("SELECT h FROM Hoteles h WHERE h.pais = :pais", Hoteles.class)
                            .setParameter("pais", pais)
                            .getResultList();
    }

    /**
     * Obtiene todas las imágenes de amenidades de un hotel específico.
     *
     * @param idHotel El ID del hotel.
     * @return Lista de URLs de imágenes de las amenidades del hotel.
     */
    public List<String> obtenerImagenesAmenidadesPorHotel(Long idHotel) {
        return em.createQuery("SELECT ia.urlImagen FROM ImagenAmenidad ia WHERE ia.hotel.id = :idHotel", String.class)
                .setParameter("idHotel", idHotel)
                .getResultList();

    }

    /**
     * Cambia el estado de un hotel.
     *
     * @param idHotel ID del hotel cuyo estado se va a cambiar.
     * @param estado El nuevo estado del hotel (activo/inactivo).
     */
    public void cambiarEstado(Long idHotel, String estado) {
        Hoteles hotel = findById(idHotel);
        if (hotel != null) {
            hotel.setEstado(estado.toLowerCase());
            persist(hotel);
        }
    }

    

}
