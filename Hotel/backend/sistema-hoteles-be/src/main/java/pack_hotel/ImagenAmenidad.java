package pack_hotel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * La clase {@code ImagenAmenidad} representa las imágenes asociadas a las amenidades de los hoteles dentro del sistema.
 * Incluye referencias al hotel y la URL de la imagen correspondiente.
 */
@Entity
@Table(name = "IMAGENES_AMENIDADES")
public class ImagenAmenidad {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_IMAGEN")
    private Long idImagen;
    
    @ManyToOne
    @JoinColumn(name = "ID_HOTEL", referencedColumnName = "ID_HOTEL")
    private Hoteles hotel;
    
    @Column(name = "URL_IMAGEN")
    private String urlImagen;

    /**
     * Obtiene el ID de la imagen de amenidad.
     * @return el ID de la imagen.
     */
    public Long getIdImagen() {
        return idImagen;
    }
    
    /**
     * Establece el ID de la imagen de amenidad.
     * @param idImagen el nuevo ID de la imagen.
     */
    public void setIdImagen(Long idImagen) {
        this.idImagen = idImagen;
    }
    
    /**
     * Obtiene el hotel asociado a esta imagen de amenidad.
     * @return el hotel asociado.
     */
    public Hoteles getHotel() {
        return hotel;
    }
    
    /**
     * Establece el hotel asociado a esta imagen de amenidad.
     * @param hotel el hotel a asociar.
     */
    public void setHotel(Hoteles hotel) {
        this.hotel = hotel;
    }
    
    /**
     * Obtiene la URL de la imagen de amenidad.
     * @return la URL de la imagen.
     */
    public String getUrlImagen() {
        return urlImagen;
    }
    
    /**
     * Establece la URL de la imagen de amenidad.
     * @param urlImagen la nueva URL de la imagen.
     */
    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }
}
