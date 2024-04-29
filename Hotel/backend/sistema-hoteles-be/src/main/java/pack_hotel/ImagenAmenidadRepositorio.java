package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;


/**
 * Repositorio para realizar operaciones de base de datos en entidades ImagenAmenidad.
 */
@ApplicationScoped
public class ImagenAmenidadRepositorio implements PanacheRepository<ImagenAmenidad> {


    /**
     * Encuentra todas las imágenes de amenidad asociadas a un hotel específico.
     *
     * @param hotelId El ID del hotel.
     * @return Lista de imágenes de amenidad asociadas al hotel.
     */
    public List<ImagenAmenidad> findByHotelId(Long hotelId) {
        return find("hotel.id_hotel", hotelId).list();
    }


    /**
     * Elimina todas las imágenes de amenidad asociadas a un hotel específico.
     *
     * @param hotelId El ID del hotel del cual se eliminarán las imágenes.
     */
    @Transactional
    public void deleteByHotelId(Long hotelId) {
        delete("hotel.id_hotel", hotelId);
    }


    /**
     * Añade una nueva imagen de amenidad a un hotel específico.
     *
     * @param hotel El hotel al que se añadirá la imagen.
     * @param urlImagen La URL de la imagen a añadir.
     */
    @Transactional
    public void addImagenToHotel(Hoteles hotel, String urlImagen) {
        ImagenAmenidad imagen = new ImagenAmenidad();
        imagen.setHotel(hotel);
        imagen.setUrlImagen(urlImagen);
        persist(imagen);
    }
}
