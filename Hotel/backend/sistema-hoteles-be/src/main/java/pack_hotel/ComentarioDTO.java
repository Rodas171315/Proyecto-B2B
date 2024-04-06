package pack_hotel;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ComentarioDTO {
    private Long idComentario;
    private Long idHabitacion;
    private Long idUsuario; 
    private String textoComentario;
    private Integer rating;
    private String nombreUsuario; 
    private String fechaComentario;
    private Long idComentarioPadre;

    // Constructor vacío
    public ComentarioDTO() {}

    // Getters y Setters
    public Long getIdComentario() {
        return idComentario;
    }

    public void setIdComentario(Long idComentario) {
        this.idComentario = idComentario;
    }

    public Long getIdHabitacion() {
        return idHabitacion;
    }

    public void setIdHabitacion(Long idHabitacion) {
        this.idHabitacion = idHabitacion;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getTextoComentario() {
        return textoComentario;
    }

    public void setTextoComentario(String textoComentario) {
        this.textoComentario = textoComentario;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getFechaComentario() {
        return fechaComentario;
    }

    public void setFechaComentario(LocalDateTime fechaComentario) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.fechaComentario = (fechaComentario != null) ? fechaComentario.format(formatter) : null;
    }

    public Long getIdComentarioPadre() {
        return idComentarioPadre;
    }

    public void setIdComentarioPadre(Long idComentarioPadre) {
        this.idComentarioPadre = idComentarioPadre;
    }

}
