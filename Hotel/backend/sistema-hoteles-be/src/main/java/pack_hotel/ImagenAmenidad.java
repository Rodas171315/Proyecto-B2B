package pack_hotel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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



    public Long getIdImagen() {
        return idImagen;
    }
    
    public void setIdImagen(Long idImagen) {
        this.idImagen = idImagen;
    }
    
    public Hoteles getHotel() {
        return hotel;
    }
    
    public void setHotel(Hoteles hotel) {
        this.hotel = hotel;
    }
    
    public String getUrlImagen() {
        return urlImagen;
    }
    
    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }
}
