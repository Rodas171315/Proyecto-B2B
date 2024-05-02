package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * La clase {@code Secciones_Generales} representa secciones de contenido general
 * en el sistema, cada sección contiene un título y un contenido.
 */
@Entity
public class Secciones_Generales {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String titulo;
    
    private String contenido;

    /**
     * Constructor sin argumentos necesario para JPA.
     */
    public Secciones_Generales() {
    }

    /**
     * Obtiene el identificador único de la sección.
     * @return El identificador de la sección.
     */
    public Long getId() {
        return id;
    }

    /**
     * Establece el identificador único de la sección.
     * @param id El nuevo identificador.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Obtiene el título de la sección.
     * @return El título de la sección.
     */
    public String getTitulo() {
        return titulo;
    }

    /**
     * Establece el título de la sección.
     * @param titulo El nuevo título de la sección.
     */
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    /**
     * Obtiene el contenido de la sección.
     * @return El contenido de la sección.
     */
    public String getContenido() {
        return contenido;
    }

    /**
     * Establece el contenido de la sección.
     * @param contenido El nuevo contenido de la sección.
     */
    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Secciones_Generales that = (Secciones_Generales) o;

        return id != null ? id.equals(that.id) : that.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "SeccionGeneral{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", contenido='" + contenido + '\'' +
                '}';
    }
}
