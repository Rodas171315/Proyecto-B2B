package pack_agencia;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * La clase {@code Aerolineas} representa una aerolínea en el sistema de gestión de agencias de viajes.
 * Contiene información básica sobre las aerolíneas como su nombre y descripción.
 */
@Entity
@Table(name = "Aerolineas")
public class Aerolineas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AerolineaID")
    private Long id;

    @Column(name = "Nombre", nullable = false, length = 255)
    private String nombre;

    @Column(name = "Descripcion", length = 1000)
    private String descripcion;

    @Column(name = "url")
    private String url;

    /**
     * Constructor por defecto para la clase Aerolineas.
     */
    public Aerolineas() {
    }

    /**
     * Obtiene el identificador único de la aerolínea.
     * @return El identificador único de la aerolínea.
     */
    public Long getId() {
        return id;
    }

    /**
     * Obtiene el nombre de la aerolínea.
     * @return El nombre de la aerolínea.
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Obtiene la descripción de la aerolínea.
     * @return La descripción de la aerolínea.
     */
    public String getDescripcion() {
        return descripcion;
    }

    public String getUrl() {
        return url;
    }

    /**
     * Establece el identificador único de la aerolínea.
     * @param id El nuevo identificador de la aerolínea.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Establece el nombre de la aerolínea.
     * @param nombre El nuevo nombre de la aerolínea.
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Establece la descripción de la aerolínea.
     * @param descripcion La nueva descripción de la aerolínea.
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}

