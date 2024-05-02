package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.util.Objects;
import java.time.LocalDateTime;

/**
 * Clase Comentario que representa un comentario hecho por un usuario sobre una habitación en un sistema de gestión hotelera.
 */
@Entity
@Table(name = "COMENTARIOS")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comentario_seq_generator")
    @SequenceGenerator(name = "comentario_seq_generator", sequenceName = "comentario_seq", allocationSize = 1)
    private Long id_comentario;

    @Column(name = "ID_HABITACION")
    private Long id_habitacion;

    @Column(name = "ID_USUARIO")
    private Long id_usuario;

    @Column(name = "TEXTO_COMENTARIO", length = 1000)
    private String texto_comentario;

    @Column(name = "RATING")
    private Integer rating; 

    @Column(name = "FECHA_COMENTARIO")
    private LocalDateTime fecha_comentario;

    @Column(name = "ID_COMENTARIO_PADRE")
    private Long id_comentario_padre;

    /**
     * Obtiene el ID del comentario.
     * @return el ID del comentario.
     */
    public Long getIdComentario() {
        return id_comentario;
    }

    /**
     * Establece el ID del comentario.
     * @param id_comentario El nuevo ID del comentario.
     */
    public void setIdComentario(Long id_comentario) {
        this.id_comentario = id_comentario;
    }

    /**
     * Obtiene el ID de la habitación sobre la cual se realiza el comentario.
     * @return el ID de la habitación.
     */
    public Long getIdHabitacion() {
        return id_habitacion;
    }

    /**
     * Establece el ID de la habitación sobre la cual se realiza el comentario.
     * @param id_habitacion El nuevo ID de la habitación.
     */
    public void setIdHabitacion(Long id_habitacion) {
        this.id_habitacion = id_habitacion;
    }

    /**
     * Obtiene el ID del usuario que hace el comentario.
     * @return el ID del usuario.
     */
    public Long getIdUsuario() {
        return id_usuario;
    }

    /**
     * Establece el ID del usuario que hace el comentario.
     * @param id_usuario El nuevo ID del usuario.
     */
    public void setIdUsuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    /**
     * Obtiene el texto del comentario.
     * @return el texto del comentario.
     */
    public String getTextoComentario() {
        return texto_comentario;
    }

    /**
     * Establece el texto del comentario.
     * @param texto_comentario El nuevo texto del comentario.
     */
    public void setTextoComentario(String texto_comentario) {
        this.texto_comentario = texto_comentario;
    }

    /**
     * Obtiene la calificación dada en el comentario.
     * @return la calificación.
     */
    public Integer getRating() {
        return rating;
    }

    /**
     * Establece la calificación del comentario.
     * @param rating La nueva calificación.
     */
    public void setRating(Integer rating) {
        this.rating = rating;
    }

    /**
     * Obtiene la fecha en la que se hizo el comentario.
     * @return la fecha del comentario.
     */
    public LocalDateTime getFechaComentario() {
        return fecha_comentario;
    }

    /**
     * Establece la fecha en la que se hizo el comentario.
     * @param fecha_comentario La nueva fecha del comentario.
     */
    public void setFechaComentario(LocalDateTime fecha_comentario) {
        this.fecha_comentario = fecha_comentario;
    }

    /**
     * Obtiene el ID del comentario padre, si es que el comentario es una respuesta a otro.
     * @return el ID del comentario padre.
     */
    public Long getIdComentarioPadre() {
        return id_comentario_padre;
    }

    /**
     * Establece el ID del comentario padre, si el comentario es una respuesta.
     * @param id_comentario_padre El nuevo ID del comentario padre.
     */
    public void setIdComentarioPadre(Long id_comentario_padre) {
        this.id_comentario_padre = id_comentario_padre;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Comentario)) return false;
        Comentario that = (Comentario) o;
        return Objects.equals(getIdComentario(), that.getIdComentario());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getIdComentario());
    }

    // toString method
    @Override
    public String toString() {
        return "Comentario{" +
                "id_comentario=" + id_comentario +
                ", id_habitacion=" + id_habitacion +
                ", id_usuario=" + id_usuario +
                ", texto_comentario='" + texto_comentario + '\'' +
                ", rating=" + rating +
                ", fecha_comentario=" + fecha_comentario +
                ", id_comentario_padre=" + id_comentario_padre +
                '}';
    }
}
