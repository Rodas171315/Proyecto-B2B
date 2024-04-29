package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class RegistroBusqueda {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String parametrosBusqueda;
    private Long usuarioId;
    private LocalDateTime fechaHora;
    private String tipoAcceso;
    private boolean esAutenticado;

    // Getters
    public Long getId() {
        return id;
    }

    public String getParametrosBusqueda() {
        return parametrosBusqueda;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public String getTipoAcceso() {
        return tipoAcceso;
    }

    public boolean getEsAutenticado() {
        return esAutenticado;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setParametrosBusqueda(String parametrosBusqueda) {
        this.parametrosBusqueda = parametrosBusqueda;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public void setTipoAcceso(String tipoAcceso) {
        this.tipoAcceso = tipoAcceso;
    }

    public void setEsAutenticado(boolean esAutenticado) {
        this.esAutenticado = esAutenticado;
    }
    
    // Overrides de hashCode y equals si son necesarios
    // ...
}
