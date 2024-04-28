package pack_hotel;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * ComentarioDTO es una clase de transferencia de datos que representa la información de un comentario
 * para ser transferido entre capas sin necesidad de utilizar la entidad directamente.
 */
public class ComentarioDTO {
    private Long idComentario;
    private Long idHabitacion;
    private Long idUsuario; 
    private String textoComentario;
    private Integer rating;
    private String nombreUsuario; 
    private String fechaComentario;
    private Long idComentarioPadre;

    /**
     * Constructor por defecto.
     */
    public ComentarioDTO() {}

    /**
     * Obtiene el ID del comentario.
     * @return ID del comentario.
     */
    public Long getIdComentario() {
        return idComentario;
    }

    /**
     * Establece el ID del comentario.
     * @param idComentario ID del comentario a establecer.
     */
    public void setIdComentario(Long idComentario) {
        this.idComentario = idComentario;
    }

    /**
     * Obtiene el ID de la habitación asociada al comentario.
     * @return ID de la habitación.
     */
    public Long getIdHabitacion() {
        return idHabitacion;
    }

    /**
     * Establece el ID de la habitación asociada al comentario.
     * @param idHabitacion ID de la habitación a establecer.
     */
    public void setIdHabitacion(Long idHabitacion) {
        this.idHabitacion = idHabitacion;
    }

    /**
     * Obtiene el ID del usuario que realizó el comentario.
     * @return ID del usuario.
     */
    public Long getIdUsuario() {
        return idUsuario;
    }

    /**
     * Establece el ID del usuario que realizó el comentario.
     * @param idUsuario ID del usuario a establecer.
     */
    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    /**
     * Obtiene el texto del comentario.
     * @return Texto del comentario.
     */
    public String getTextoComentario() {
        return textoComentario;
    }

    /**
     * Establece el texto del comentario.
     * @param textoComentario Texto del comentario a establecer.
     */
    public void setTextoComentario(String textoComentario) {
        this.textoComentario = textoComentario;
    }

    /**
     * Obtiene la calificación dada en el comentario.
     * @return Calificación del comentario.
     */
    public Integer getRating() {
        return rating;
    }

    /**
     * Establece la calificación del comentario.
     * @param rating Calificación a establecer.
     */
    public void setRating(Integer rating) {
        this.rating = rating;
    }

    /**
     * Obtiene el nombre del usuario que realizó el comentario.
     * @return Nombre del usuario.
     */
    public String getNombreUsuario() {
        return nombreUsuario;
    }

    /**
     * Establece el nombre del usuario que realizó el comentario.
     * @param nombreUsuario Nombre del usuario a establecer.
     */
    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    /**
     * Obtiene la fecha del comentario formateada como 'yyyy-MM-dd HH:mm:ss'.
     * @return Fecha del comentario como String.
     */
    public String getFechaComentario() {
        return fechaComentario;
    }

    /**
     * Establece la fecha del comentario.
     * @param fechaComentario Fecha del comentario a establecer.
     */
    public void setFechaComentario(LocalDateTime fechaComentario) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.fechaComentario = (fechaComentario != null) ? fechaComentario.format(formatter) : null;
    }

    /**
     * Obtiene el ID del comentario padre si este comentario es una respuesta.
     * @return ID del comentario padre.
     */
    public Long getIdComentarioPadre() {
        return idComentarioPadre;
    }

    /**
     * Establece el ID del comentario padre si este comentario es una respuesta.
     * @param idComentarioPadre ID del comentario padre a establecer.
     */
    public void setIdComentarioPadre(Long idComentarioPadre) {
        this.idComentarioPadre = idComentarioPadre;
    }
}
