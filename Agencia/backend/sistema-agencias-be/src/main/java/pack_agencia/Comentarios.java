package pack_agencia;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * La clase {@code Comentarios} representa un comentario en el sistema de gestión de comentarios de usuarios.
 * Los comentarios pueden ser anidados, permitiendo respuestas a comentarios existentes.
 */
@Entity
public class Comentarios extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    public Usuarios usuario;

    @Column(nullable = false, length = 1024)
    public String comentario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    public Comentarios parent;

    @OneToMany(mappedBy = "parent")
    public List<Comentarios> replies = new ArrayList<>();

    @Column(name = "fecha_creacion", nullable = false)
    public LocalDateTime fechaCreacion = LocalDateTime.now();


    /**
     * Constructor por defecto para la clase Comentarios.
     */

    public Comentarios() {
    }

    /**
     * Obtiene el identificador único del comentario.
     * @return El identificador único del comentario.
     */
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Obtiene el usuario del cometario.
     * @return El usuario del cometario.
     */
    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }

    /**
     * Obtiene el contenido del comentario.
     * @return El contenido del comentario.
     */

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    /**
     * Obtiene el identificador único del comentario padre.
     * @return El identificador único del comentario padre.
     */

    public Comentarios getParent() {
        return parent;
    }

    public void setParent(Comentarios parent) {
        this.parent = parent;
    }

    /**
     * Obtiene la lista de respuestas del comentario.
     * @return La lista de respuestas del comentario.
     */

    public List<Comentarios> getReplies() {
        return replies;
    }

    public void setReplies(List<Comentarios> replies) {
        this.replies = replies;
    }

    /**
     * Obtiene la fecha de creacion del comentario.
     * @return La fecha de creacion del comentario.
     */

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    
    @Override
    public String toString() {
        return "Comentarios{" +
                "id=" + id +
                ", usuario=" + usuario +
                ", comentario='" + comentario + '\'' +
                ", parent=" + parent +
                ", fechaCreacion=" + fechaCreacion +
                '}';
    }
}
