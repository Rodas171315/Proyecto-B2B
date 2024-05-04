package pack_agencia;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * La clase Hoteles representa un hotel en el sistema de agencia de viajes.
 * Contiene información sobre el hotel, como su nombre, descripción y ubicación.
 */
@Entity
@Table(name = "Hoteles")
public class Hoteles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HotelID") 
    private Long id;

    @Column(name = "Nombre", nullable = false, length = 255)
    private String nombre;

    @Column(name = "Descripcion", length = 1000)
    private String descripcion;

    @Column(name = "Ubicacion", length = 1000)
    private String ubicacion;

    @Column(name = "url")
    private String url;


    /**
     * Constructor por defecto.
     */
    public Hoteles() {

    }

    // Métodos getters y setters

    /**
     * Obtiene el ID del hotel.
     * @return el ID del hotel.
     */
    public Long getId() {
        return id;
    }

    /**
     * Establece el ID del hotel.
     * @param id el nuevo ID del hotel.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Obtiene el nombre del hotel.
     * @return el nombre del hotel.
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Establece el nombre del hotel.
     * @param nombre el nuevo nombre del hotel.
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Obtiene la descripción del hotel.
     * @return la descripción del hotel.
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Establece la descripción del hotel.
     * @param descripcion la nueva descripción del hotel.
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * Obtiene la ubicación del hotel.
     * @return la ubicación del hotel.
     */
    public String getUbicacion() {
        return ubicacion;
    }

    /**
     * Establece la ubicación del hotel.
     * @param ubicacion la nueva ubicación del hotel.
     */
    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
