package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

/**
 * La clase {@code RegistroBusqueda} representa un registro de búsqueda efectuado por un usuario.
 * Almacena detalles como los parámetros de búsqueda, la identificación del usuario, la fecha y hora de la búsqueda,
 * el tipo de acceso y si la búsqueda fue autenticada.
 */
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

    /**
     * Obtiene el identificador único del registro de búsqueda.
     * @return El identificador del registro.
     */
    public Long getId() {
        return id;
    }

    /**
     * Establece el identificador único del registro de búsqueda.
     * @param id El nuevo identificador.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Obtiene los parámetros utilizados en la búsqueda.
     * @return Los parámetros de búsqueda.
     */
    public String getParametrosBusqueda() {
        return parametrosBusqueda;
    }

    /**
     * Establece los parámetros utilizados en la búsqueda.
     * @param parametrosBusqueda Los nuevos parámetros de búsqueda.
     */
    public void setParametrosBusqueda(String parametrosBusqueda) {
        this.parametrosBusqueda = parametrosBusqueda;
    }

    /**
     * Obtiene el ID del usuario que realizó la búsqueda.
     * @return El ID del usuario.
     */
    public Long getUsuarioId() {
        return usuarioId;
    }

    /**
     * Establece el ID del usuario que realizó la búsqueda.
     * @param usuarioId El nuevo ID del usuario.
     */
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    /**
     * Obtiene la fecha y hora en que se realizó la búsqueda.
     * @return La fecha y hora de la búsqueda.
     */
    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    /**
     * Establece la fecha y hora en que se realizó la búsqueda.
     * @param fechaHora La nueva fecha y hora de la búsqueda.
     */
    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    /**
     * Obtiene el tipo de acceso con el que se realizó la búsqueda (por ejemplo, 'web', 'móvil').
     * @return El tipo de acceso.
     */
    public String getTipoAcceso() {
        return tipoAcceso;
    }

    /**
     * Establece el tipo de acceso con el que se realizó la búsqueda.
     * @param tipoAcceso El nuevo tipo de acceso.
     */
    public void setTipoAcceso(String tipoAcceso) {
        this.tipoAcceso = tipoAcceso;
    }

    /**
     * Indica si el usuario estaba autenticado al momento de realizar la búsqueda.
     * @return {@code true} si el usuario estaba autenticado, {@code false} en caso contrario.
     */
    public boolean getEsAutenticado() {
        return esAutenticado;
    }

    /**
     * Establece si el usuario estaba autenticado al momento de realizar la búsqueda.
     * @param esAutenticado {@code true} si el usuario estaba autenticado, {@code false} en caso contrario.
     */
    public void setEsAutenticado(boolean esAutenticado) {
        this.esAutenticado = esAutenticado;
    }
    
}

