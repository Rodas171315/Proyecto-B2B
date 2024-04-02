package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ImagenAmenidadRepositorio implements PanacheRepository<ImagenAmenidad> {

    public List<ImagenAmenidad> findByHotelId(Long hotelId) {
        return find("hotel.id_hotel", hotelId).list();
    }

    @Transactional
    public void deleteByHotelId(Long hotelId) {
        delete("hotel.id_hotel", hotelId);
    }

    @Transactional
    public void addImagenToHotel(Hoteles hotel, String urlImagen) {
        ImagenAmenidad imagen = new ImagenAmenidad();
        imagen.setHotel(hotel);
        imagen.setUrlImagen(urlImagen);
        persist(imagen);
    }
}
