package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.util.Objects;
import java.time.LocalDateTime;

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
    private Integer rating; // Cambiado a Integer para permitir nulos

    @Column(name = "FECHA_COMENTARIO")
    private LocalDateTime fecha_comentario;

    @Column(name = "ID_COMENTARIO_PADRE")
    private Long id_comentario_padre;

    public Long getIdComentario() {
        return id_comentario;
    }

    public void setIdComentario(Long id_comentario) {
        this.id_comentario = id_comentario;
    }

    public Long getIdHabitacion() {
        return id_habitacion;
    }

    public void setIdHabitacion(Long id_habitacion) {
        this.id_habitacion = id_habitacion;
    }

    public Long getIdUsuario() {
        return id_usuario;
    }

    public void setIdUsuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getTextoComentario() {
        return texto_comentario;
    }

    public void setTextoComentario(String texto_comentario) {
        this.texto_comentario = texto_comentario;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public LocalDateTime getFechaComentario() {
        return fecha_comentario;
    }

    public void setFechaComentario(LocalDateTime fecha_comentario) {
        this.fecha_comentario = fecha_comentario;
    }

    public Long getIdComentarioPadre() {
        return id_comentario_padre;
    }

    public void setIdComentarioPadre(Long id_comentario_padre) {
        this.id_comentario_padre = id_comentario_padre;
    }

    


    // Equals and hashCode methods

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

